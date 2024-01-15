/**
 * Converts a CSV string into an array.
 *
 * @function CSVtoArray
 * @param {string} text - The CSV string to convert.
 * @returns {Array<string>|null} An array of values from the CSV string, or null if the CSV string is not valid.
 */
function CSVtoArray(text) {
    const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

    if (!re_valid.test(text)) return null;

    let values = [];
    text.replace(re_value, (_, m1, m2, m3) => {
        if (m1 !== undefined) values.push(m1.replace(/\\'/g, "'"));
        else if (m2 !== undefined) values.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) values.push(m3);
        return '';
    });

    if (/,\s*$/.test(text)) values.push('');

    return values;
};

module.exports = {
    CSVtoArray,
};