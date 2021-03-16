exports.formatPostcode = (postcode) => {
	const parts = postcode
		.toUpperCase()
		.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
	if (parts === null) return postcode.toUpperCase();
	parts.shift();
	return parts.join(' ');
};

exports.convertUKDateToUS = (dateString) => {
	if (!dateString) return '';
	const parts = dateString.split('/');
	return `${parts[1]}/${parts[0]}/${parts[2]}`;
};

exports.returnExpiryDate = (date) => {
	let in3Years;
	if (typeof date === 'string') {
		const dateObj = new Date(this.convertUKDateToUS(date));
		in3Years = new Date(dateObj.setFullYear(dateObj.getFullYear() + 3));
	}
	if (typeof date === 'object') {
		in3Years = new Date(date.setFullYear(date.getFullYear() + 3));
	}
	if (!date) {
		const d = new Date();
		const year = d.getFullYear();
		const month = d.getMonth();

		in3Years = new Date(year + 3, month - 1, 1);
	}

	// return `${in3Years.getDate()}/${
	// 	in3Years.getMonth() + 1
	// }/${in3Years.getFullYear()}`;
	return in3Years.toLocaleDateString();
};

exports.getDataByCentre = (data, centre) => {
	return data.filter((datum) => {
		return datum['registration location name'] === centre;
	});
};

exports.getCentres = (data) => {
	return data.reduce((centres, datum) => {
		if (!centres.includes(datum['Registration Location Name'])) {
			centres.push(datum['Registration Location Name']);
		}
		return centres;
	}, []);
};

exports.getASICentres = (data) => {
	return data.reduce((centres, datum) => {
		if (!centres.includes(datum['Location Name'])) {
			centres.push(datum['Location Name']);
		}
		return centres;
	}, []);
};

exports.returnFileName = (centre) => {
	const today = new Date();
	const months = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec',
	];
	const lastMonth = months.slice(today.getMonth() - 1)[0];
	return `${centre.split(' ').join('-').toLowerCase()}-${lastMonth}-wifi.csv`;
};

exports.objectKeysToLowerCase = (object) => {
	const newObject = {};
	Object.keys(object).map((key) => {
		newObject[key.toLowerCase()] = object[key];
	});
	return newObject;
};

exports.formatDatum = (datum) => {
	const lowerCaseDatum = this.objectKeysToLowerCase(datum);
	lowerCaseDatum['sign up source'] = 'wifi';
	lowerCaseDatum['postcode'] = this.formatPostcode(lowerCaseDatum['postcode']);
	if (lowerCaseDatum['week ending']) {
		const weekEnding = this.convertUKDateToUS(lowerCaseDatum['week ending']);
		const date = new Date(weekEnding);
		date.setDate(date.getDate() - 7);

		lowerCaseDatum['expiry date'] = this.returnExpiryDate(date);
	}
	if (lowerCaseDatum['creationdate']) {
		lowerCaseDatum['expiry date'] = this.returnExpiryDate(
			lowerCaseDatum['creationdate'].slice(0, 10).split('-').reverse().join('/')
		);
	}
	return lowerCaseDatum;
};

exports.removeDuplicateEmails = (data) => {
	if (data.length === 0) return data;
	const columns = Object.keys(data[0]);
	let emailKey;
	const emailColumnVariants = [
		'email address',
		'Email Address',
		'email',
		'username',
	];
	emailColumnVariants.forEach((variant) => {
		if (columns.includes(variant)) {
			emailKey = variant;
		}
	});
	if (columns.includes('username') && columns.includes('email')) {
		emailKey = 'email';
	}
	const loggedEmails = [];
	return data.reduce((deDupedArray, datum) => {
		if (!loggedEmails.includes(datum[emailKey]) && datum[emailKey] !== '') {
			loggedEmails.push(datum[emailKey]);
			deDupedArray.push(datum);
		}
		return deDupedArray;
	}, []);
};

exports.filterDataByMonth = (data, month) => {
	if (!data.length) return data;
	if (!Object.keys(data[0]).includes('creationdate')) return data;
	if (!month) {
		const today = new Date();
		const months = [
			'01',
			'02',
			'03',
			'04',
			'05',
			'06',
			'07',
			'08',
			'09',
			'10',
			'11',
			'12',
		];
		month = months.slice(today.getMonth() - 1)[0];
	} else if (month.length === 1) {
		month = `0${month.toString()}`;
	}
	return data.filter((datum) => {
		if (!month) {
			return datum['creationdate'].slice(0, 10).split('-')[1] == month;
		} else {
			return datum['creationdate'].slice(0, 10).split('-')[1] == month;
		}
	});
};

exports.arrayCompare = (_arr1, _arr2) => {
	if (
		!Array.isArray(_arr1) ||
		!Array.isArray(_arr2) ||
		_arr1.length !== _arr2.length
	) {
		return false;
	}

	// .concat() to not mutate arguments
	const arr1 = _arr1.concat().sort();
	const arr2 = _arr2.concat().sort();

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
};

exports.validateInputFormat = (object) => {
	if (!object)
		return {
			isValid: false,
			dataType: 'n/a',
		};
	if (
		this.arrayCompare(Object.keys(object), [
			'Email',
			'Estate Name',
			'Federated Group Name',
			'First Name',
			'Last Name',
			'Location Name',
			'Marketing Consent',
			'Postcode',
			'Week Ending',
		])
	) {
		return {
			isValid: true,
			dataType: '3',
		};
	} else if (
		this.arrayCompare(Object.keys(object), [
			'Email Address',
			'Title',
			'Forename',
			'Surname',
			'Postcode',
			'Mobile Number',
			'Registration Location ID',
			'Registration Location Name',
			'Marketing Opt In',
		])
	) {
		return {
			isValid: true,
			dataType: '2',
		};
	} else if (
		this.arrayCompare(Object.keys(object), [
			'username',
			'total_downloaded_bytes',
			'total_uploaded_bytes',
			'total_sessions',
			'online_time_seconds',
			'postcode',
			'gender',
			'agent_device',
			'email',
		])
	) {
		return {
			isValid: true,
			dataType: '4',
		};
	} else if (
		this.arrayCompare(Object.keys(object), [
			'username',
			'creationdate',
			'firstname',
			'lastname',
			'postcode',
			'opt_in',
		])
	) {
		return {
			isValid: true,
			dataType: '1',
		};
	} else if (
		this.arrayCompare(Object.keys(object), [
			'Email Address',
			'Title',
			'Forename',
			'Surname',
			'Postcode',
			'Mobile Number',
			'Registration Location ID',
			'Registration Location Name',
			'Marketing Opt In',
		])
	) {
		return {
			isValid: true,
			dataType: '2',
		};
	} else {
		return { isValid: false, dataType: 'unrecognised' };
	}
};

exports.sortDataIntoFiles = (data) => {
	if (data.length === 0) return data;

	const files = [];

	const flattenedArr = data.reduce((acc, item) => {
		return acc.concat(item);
	}, []);

	const centres = this.getCentres(flattenedArr);
	flattenedArr.forEach((item) => {
		centres.forEach((centre, i) => {
			if (item['Registration Location Name'] === centre && !files[i]) {
				files[i] = [];
				files[i].push(item);
			} else if (item['Registration Location Name'] === centre) {
				files[i].push(item);
			} else if (item['Location Name'] === centre && !files[i]) {
				files[i] = [];
				files[i].push(item);
			} else if (item['Location Name'] === centre) {
				files[i].push(item);
			}
		});
	});
	return files;
};

exports.sortDataIntoFiles = (data) => {
	if (data.length === 0) return data;

	const files = [];

	const flattenedArr = data.reduce((acc, item) => {
		return acc.concat(item);
	}, []);

	const centres = this.getCentres(flattenedArr);
	flattenedArr.forEach((item) => {
		centres.forEach((centre, i) => {
			if (item['Registration Location Name'] === centre && !files[i]) {
				files[i] = [];
				files[i].push(item);
			} else if (item['Registration Location Name'] === centre) {
				files[i].push(item);
			} else if (item['Location Name'] === centre && !files[i]) {
				files[i] = [];
				files[i].push(item);
			} else if (item['Location Name'] === centre) {
				files[i].push(item);
			}
		});
	});
	return files;
};

exports.sortASIDataIntoFiles = (data) => {
	if (data.length === 0) return data;

	const files = [];

	const flattenedArr = data.reduce((acc, item) => {
		return acc.concat(item);
	}, []);

	const centres = this.getASICentres(flattenedArr);
	flattenedArr.forEach((item) => {
		centres.forEach((centre, i) => {
			if (item['Location Name'] === centre && !files[i]) {
				files[i] = [];
				files[i].push(item);
			} else if (item['Location Name'] === centre) {
				files[i].push(item);
			}
		});
	});
	return files;
};

exports.getExpiryDateFromFileName = (fileName, provider) => {
	const response = {
		inkspot: () => {
			const dateRegex = /\d{4}-\d{2}-\d{2}/;
			const date = fileName.match(dateRegex)[0];
			const dateObj = new Date(date);
			return this.returnExpiryDate(dateObj);
		},
		'bt-mult': () => {
			const dateRegex = /\d{6}/g;
			const date = fileName.match(dateRegex)[0];
			const year = `20${date.slice(0, 2)}`;
			const month = date.slice(2, 4);
			const day = date.slice(4);
			const dateString = `${year}-${month}-${day}`;
			const dateObj = new Date(dateString);
			dateObj.setDate(dateObj.getDate() - 7);
			return this.returnExpiryDate(dateObj);
		},
	};
	return response[provider]();
};
