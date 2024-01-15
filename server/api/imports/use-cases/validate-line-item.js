const { isAfterDate } = require("../../../util/dates");

/**
 * The function `validateDateWorked` checks if the `dateWorked` is a future date and throws an error if
 * it is.
 * @param dateWorked - The parameter `dateWorked` is a date value that represents the date on which
 * work was performed.
 */
function validateDateWorked(dateWorked) {
  if (isAfterDate(dateWorked))
    throw new Error("Date worked cannot be a future date.");
}

/**
 * The function validates that the total hours worked is a positive number between 1 and 24.
 * @param hoursWorked - The `hoursWorked` parameter is the total number of hours worked.
 */
function validateHoursWorked(hoursWorked) {
  const hours = parseInt(hoursWorked);

  if (isNaN(hours) || hours <= 0 || hours > 24)
    throw new Error(
      "Total hours must be greater than 0 and less than or equal to 24."
    );
}

// TODO: Document function
function validateWorkShift(
  workShift,
  contract,
  currentContractUsingAmendments
) {
  const shift = parseInt(workShift.split(" ")[2]);

  if (currentContractUsingAmendments && shift > contractAmendment.field_1116) {
    throw new Error(
      "The work shift is not one of the options available on the contract amendment for this work day."
    );
  }

  if (!currentContractUsingAmendments && shift > contract.field_796) {
    throw new Error(
      "The work shift is not one of the options available on the contract for this work day."
    );
  }
}

/**
 * The function validates if a given bill type is valid or not.
 * @param billType - The `billType` parameter is a string that represents the type of bill.
 * @returns If the `billType` parameter is falsy (e.g. `null`, `undefined`, empty string), then nothing
 * is returned explicitly. The function will exit at the `if (!billType) return;` statement and no
 * further code will be executed.
 */
function validateBillType(billType) {
  if (!billType) return;

  const billTypes = ["RT", "OT", "DT", "VAC", "SICK", "HOL", "PERS", "OTH"];
  const found = billTypes.includes(billType.toUpperCase());

  if (!found) throw new Error("Invalid bill type.");
}

/**
 * The function validates a line item by checking the date worked, hours worked, work shift, and bill
 * type.
 * @param lineItem - An object representing a line item, which typically includes properties such as
 * dateWorked, hoursWorked, workShift, contract, and billType.
 * @param isUsingContractAmendments - A boolean value indicating whether or not the contract amendments
 * are being used.
 */
function validateLineItem(lineItem, isUsingContractAmendments) {
  validateDateWorked(lineItem.dateWorked);
  validateHoursWorked(lineItem.hoursWorked);
  validateWorkShift(
    lineItem.workShift,
    lineItem.contract,
    isUsingContractAmendments
  );
  validateBillType(lineItem.billType);
}

module.exports = {
  validateLineItem,
};
