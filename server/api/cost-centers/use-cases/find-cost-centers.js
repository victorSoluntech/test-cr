// TODO: document function
async function findCostCenterForLineItems(lineItem) {
    const costCenterIdentifier = lineItem.costCenter;
    const isUsingAmendment = lineItem.contract.field_2224 === "Yes";

  if (!costCenterIdentifier)
    throw new Error("No cost center identifier provided");

  const costCenters = isUsingAmendment
    ? lineItem.contractAmendment.field_1089_raw
    : lineItem.contract.field_494_raw;

  if (!costCenters) throw new Error("The cost center is not one of the options available on the contract amendment for this work day.");

  const foundCostCenter = costCenters.find(
    (costCenter) => costCenter.identifier.trim() === costCenterIdentifier.trim()
  );

  if (!foundCostCenter) throw new Error("The cost center is not one of the options available on the contract amendment for this work day.");

  return foundCostCenter;
}

module.exports = {
    findCostCenterForLineItems,
};
