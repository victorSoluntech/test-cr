const { createLineItem } = require("../expense-cards.knack.service");
const {
  createLineItemBody,
  getContractSupplier,
  getCostCentersToConnect,
} = require("../expense-cards.utils");

/**
 * The function `createLineItemFromCsv` creates a line item from a CSV file, including additional
 * information such as contract supplier ID and cost centers to connect.
 * @param lineItem - The `lineItem` parameter is an object that represents a line item from a CSV file.
 * It contains various properties that provide information about the line item, such as the contract it
 * belongs to and any amendments that are being used.
 * @returns an object that contains the following properties:
 */
async function createLineItemFromCsv(lineItem) {
  try {
    const isUsingAmendment = lineItem.contract.field_2224 === "Yes";

    const body = createLineItemBody(lineItem, isUsingAmendment);

    const newLineItem = await createLineItem(body);

    const contractSupplierID = getContractSupplier(lineItem.contract);

    const costCentersToConnect = getCostCentersToConnect(
      lineItem,
      isUsingAmendment
    );

    return { ...newLineItem, contractSupplierID, costCentersToConnect };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createLineItemFromCsv,
};
