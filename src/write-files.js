import * as XLSX from 'xlsx';

const writeFileQ = (workbook, filename) => {
    return new Promise((resolve, reject) => {
        XLSX.writeFile(filename, workbook, (error, result) => {
            (error)? reject(error) : resolve(result);
        })
    })
}

const {
	getCentres,
	getDataByCentre,
	returnFileName,
	formatDatum,
	filterDataByMonth,
	removeDuplicateEmails,
} = require('./utils');

const handleSaveToPC = (fileName, jsonArr) => {
	const ws = XLSX.utils.json_to_sheet(jsonArr);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'wifi-data');
	XLSX.writeFile(wb, fileName);

};

// LIM and L&G

const createMultipleFiles = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['registration location name']);

	handleSaveToPC(fileName, deDuped);
};

// ASI

const createASIFiles = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['location name']);

	handleSaveToPC(fileName, deDuped);
};

// Inkspot/Freerunner/ASI

const createSingleFile = (fileName, data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});
	const filteredByMonth = filterDataByMonth(formattedData);
	const deDupedAndFilteredByMonth = removeDuplicateEmails(filteredByMonth);

	handleSaveToPC(
		returnFileName(fileName.substring(0, fileName.length - 4)),
		deDupedAndFilteredByMonth
	);
};

export { createMultipleFiles, createSingleFile, createASIFiles };
