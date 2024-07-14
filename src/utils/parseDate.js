
function parseDate(dateStr) {
  if (typeof dateStr !== 'string' || dateStr.trim() === '') {
		return null;
	}

	const year = parseInt(dateStr.substr(0, 4), 10);
	const month = parseInt(dateStr.substr(4, 2), 10) - 1; 
	const day = parseInt(dateStr.substr(6, 2), 10);

	const dateObject = new Date(year, month, day);

	if (
		dateObject.getFullYear() === year &&
		dateObject.getMonth() === month &&
		dateObject.getDate() === day
	) {
		return dateObject;
	} else {
		return null;
	}
}

module.exports = { parseDate };
