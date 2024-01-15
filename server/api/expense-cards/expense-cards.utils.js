/**
 * The function `createLineItemBody` creates a body object for a line item using various properties
 * from the `lineItem` object and the `currentContractUsingAmendments` flag.
 * @param lineItem - An object representing a line item. It contains properties such as contract,
 * contractAmendment, costCenter, and other fields related to the line item.
 * @param currentContractUsingAmendments - A boolean value indicating whether the current contract is
 * using amendments or not.
 * @returns the `body` object.
 */
function createLineItemBody(lineItem, currentContractUsingAmendments) {
  const { contract, contractAmendment, costCenter, ...rest } = lineItem;
  const fields = ["field_47_raw", "field_338_raw", "field_1327_raw"];
  const body = {
    field_1907: rest.mappingId,
    field_1906: rest.billType,
    field_799: rest.workShift,
    field_486: rest.hoursWorked,
    field_484: rest.dateWorked,
    field_1912: costCenter.identifier,
    field_760: contract.id,
    field_482: rest.createdBy,
    field_1908: rest.importLog,
    field_490: costCenter.id,
    field_487: getTimeBillType(rest.billType),
  };

  fields.forEach((field) => {
    if (contract.hasOwnProperty(field) && contract[field].length > 0) {
      body[field.replace("_raw", "")] = contract[field][0].id;
    }
  });

  if (currentContractUsingAmendments) body.field_1118 = contractAmendment.id;

  return body;
}

/**
 * The function `getTimeBillType` returns the corresponding description for a given bill type.
 * @param billType - The `billType` parameter is a string that represents the type of bill.
 * @returns the corresponding value for the given billType from the billTypes object.
 */
function getTimeBillType(billType) {
  const billTypes = {
    RT: "Regular Time",
    OT: "Overtime",
    DT: "Double Time",
    VAC: "Vacation",
    SICK: "Sick",
    HOL: "Holiday",
    PERS: "Personal",
    OTH: "Other",
  };

  return billTypes[billType];
}

/**
 * The function `getContractSupplier` returns the ID of the first supplier in the `field_51_raw` array
 * of a given `contract` object, if it exists.
 * @param contract - The `contract` parameter is an object that represents a contract.
 * @returns the ID of the contract supplier, which is stored in the `field_51_raw` property of the
 * `contract` object. If the `field_51_raw` property exists and has at least one element in its array,
 * the function returns the ID of the first element. Otherwise, it returns an empty string.
 */
function getContractSupplier(contract) {
  const field = "field_51";
  const rawField = "field_51_raw";
  const hasField =
    contract.hasOwnProperty(rawField) && contract[field].length > 0;

  return hasField ? contract[rawField][0].id : "";
}

/**
 * The function `getCostCentersToConnect` returns an array of cost centers to connect based on the
 * provided line item and whether an amendment is being used.
 * @param lineItem - An object that contains information about a line item, including the contract and
 * contract amendment.
 * @param isUsingAmendment - A boolean value indicating whether the amendment contract should be used
 * instead of the original contract.
 * @returns an array of cost centers to connect.
 */
function getCostCentersToConnect(lineItem, isUsingAmendment) {
  const { contract, contractAmendment } = lineItem;
  const target = isUsingAmendment ? contractAmendment : contract;
  const field = isUsingAmendment ? "field_1089_raw" : "field_494_raw";

  return target.hasOwnProperty(field) && target[field].length > 0
    ? target[field]
    : [];
}

module.exports = {
  createLineItemBody,
  getTimeBillType,
  getContractSupplier,
  getCostCentersToConnect,
};
