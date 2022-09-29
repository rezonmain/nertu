// Counts the numeric chars in a string
const countNumeric = (str: string) => {
	return str.split('').filter((v) => v === '0' || parseInt(v)).length;
};

export default countNumeric;
