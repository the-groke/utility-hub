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

const saveToPC = (fileName, jsonArr) => {
	const ws = XLSX.utils.json_to_sheet(jsonArr);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'wifi-data');
	XLSX.writeFile(wb, fileName);

};

// LIM and L&G

const createLimLGFile = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['registration location name']);

	saveToPC(fileName, deDuped);
};

// ASI

const createASIFile = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['location name']);

	saveToPC(fileName, deDuped);
};

// Inkspot/Freerunner/ASI

const createSingleInputFile = (fileName, data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});
	const filteredByMonth = filterDataByMonth(formattedData);
	const deDupedAndFilteredByMonth = removeDuplicateEmails(filteredByMonth);

	saveToPC(
		returnFileName(fileName.substring(0, fileName.length - 4)),
		deDupedAndFilteredByMonth
	);
};

export { createLimLGFile, createSingleInputFile, createASIFile };
