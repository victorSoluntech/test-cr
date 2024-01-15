const { parseDate, isAfterDate } = require("../../../util/dates");
const { CSVtoArray } = require("../../../util/csv");
const { ExtendedError } = require("../../../util/error-handler");

/**
 * Parses CSV line items from a file.
 *
 * @async
 * @function parseCSVLineItems
 * @param {Object} payload - The payload object containing the import log ID and the creator's ID.
 * @param {string} buyer - The buyer.
 * @param {string} file - The CSV file content as a string.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of TE line item objects.
 * @throws {ExtendedError} An ExtendedError object containing an error message and a list of rows with errors.
 */
async function parseCSVLineItems(payload, buyer, file) {
  try {
    console.log("[parseCSVLineItems] start");

    const rows = file.split(/\r\n|\r|\n/g).slice(1);

    const validRows = filterValidRows(rows);

    const lineItems = validRows.map((row) =>
      createLineItemsTemplate(CSVtoArray(row), payload, buyer)
    );

    console.log("[parseCSVLineItems] end");

    return lineItems;
  } catch (error) {
    throw new ExtendedError(`Error processing CSV rows: ${error.message}`, error.list);
  }
}

/**
 * Creates a TE line item object from an array of cells, a payload, and a buyer.
 *
 * @function createLineItemsTemplate
 * @param {Array<string>} cells - An array of cells from a CSV row.
 * @param {Object} payload - The payload object containing the import log ID and the creator's ID.
 * @param {string} buyer - The buyer.
 * @returns {Object} A TE line item object.
 * @throws {Error} Throws an error if an error occurs while creating the TE line item object.
 */
function createLineItemsTemplate(cells, payload, buyer) {
  try {
    return {
      mappingId: cells[0].trim(),
      billType: cells[1].trim(),
      workShift: cells[2].trim(),
      hoursWorked: cells[3].trim(),
      dateWorked: cells[4].trim()
        ? parseDate(cells[4].trim())
        : "",
      costCenter: cells[5].trim(),
      createdBy: payload.field_1485_raw[0].id,
      importLog: payload.id,
      buyer: buyer,
    };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Filters out invalid rows from an array of CSV rows.
 *
 * @function filterValidRows
 * @param {Array<string>} rows - An array of CSV rows.
 * @returns {Array<string>} An array of valid CSV rows.
 * @throws {Error} Throws an error if an error occurs while filtering the rows.
 */
function filterValidRows(rows) {
  const rowsWithError = [];
  const validRows = rows.filter((row) => {
    if (row === "") return false;

    const cells = CSVtoArray(row);
    if (cells === null || cells.length < 6) {
      rowsWithError.push(`Invalid format in row: ${index}`);
      return false;
    }

    return true;
  });

  if (rowsWithError.length > 0)
    throw new ExtendedError("Error filtering rows", rowsWithError);

  return validRows;
}

/**
 * Checks CSV line items for errors.
 * @param {Array} parsedCsv - The parsed CSV data as an array of objects.
 * @throws {ExtendedError} Will throw an error if validation fails.
 */
const checkCSVerrorsLineItems = (parsedCsv) => {
    let errorList = [];
    const validbillTypes = ['RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'];

    /**
     * Adds an error message to the error list if the condition is true.
     * @param {boolean} condition - The condition to check.
     * @param {string} message - The error message to add.
     */
    const addError = (condition, message) => {
        if (condition) {
            errorList.push(message);
        }
    }

    /**
     * Validates a row of CSV data.
     * @param {Object} row - The row to validate.
     */
    const validateRow = (row) => {
        addError(!row.mappingId, "At least one row does not have mapping ID, Mapping ID cannot be blank");
        addError(!row.hoursWorked, "At least one row does not have hours Worked, hours Worked cannot be blank");
        addError(isNaN(parseFloat(row.hoursWorked)), "At least one row contains invalid characters in hours Worked, hours Worked must be a number using '.' as a decimal separator");
        addError(parseFloat(row.hoursWorked) < -24 || parseFloat(row.hoursWorked) > 24, "At least one row contains hours worked higher than 24 or lower than -24. Total hours must be greater than -24 and less than or equal to 24.");
        addError(!row.billType, "At least one row does not have Bill Type, Bill Type cannot be blank");
        addError(!validbillTypes.includes(row.billType), "At least one row have an invalid Bill Type, make sure that the Bill Type is one of the following: 'RT', 'OT', 'DT', 'VAC', 'SICK', 'HOL', 'PERS', 'OTH'");
        addError(!row.dateWorked, "At least one row does not have date Worked, date Worked cannot be blank");
        addError(row.dateWorked == "Invalid date", "At least one row have an invalid format in the date Worked, make sure that the date format follow MM/DD/YYYY");
        addError(isAfterDate(row.dateWorked), "At least one row have a Date worked as a future date, Date worked cannot be a future date.");
    }

    try {
        console.log("[checkCSVerrorsLineItems] start");

        parsedCsv.forEach(validateRow);

        errorList = [...new Set(errorList)];

        console.log("[checkCSVerrorsLineItems] end");

        if (errorList.length > 0) throw new Error("found errors during CSV validation", errorList);
    } catch (error) {
        throw new ExtendedError(error.message, error.list);
    }
};

module.exports = {
  parseCSVLineItems,
  checkCSVerrorsLineItems,
};
