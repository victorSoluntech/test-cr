/**
 * Helper function to check if a contract amendment matches the provided ID and date.
 *
 * @param {Object} contract - The contract amendment to check.
 * @param {string} id - The ID to match.
 * @param {string} date - The date to match.
 * @returns {boolean} True if the contract amendment matches the provided ID and date, false otherwise.
 */
function isMatchingAmendment(contract, id, date) {
    const startDate = Moment(contract.field_1139, "L");
    const endDate = Moment(contract.field_1148, "L");
    const hasMatchingId = contract.hasOwnProperty("field_1112_raw") && contract.field_1112_raw.length > 0 && contract.field_1112_raw[0].id == id;
    const isWithinDateRange = Moment(date).isBetween(startDate, endDate, "days", "[]");

    return hasMatchingId && isWithinDateRange;
}


/**
 * The function `findContractAmendmentForLineItems` searches for a contract amendment based on a line
 * item's contract amendment ID and date worked.
 * @param lineItem - The `lineItem` parameter represents a specific line item in a contract. It
 * contains information about the contract, such as the contract amendment ID and the date worked on
 * the line item.
 * @returns a contract amendment object that matches the given line item. If the current contract is
 * not using amendments, it will return null.
 */
async function findContractAmendmentForLineItems(lineItem) {

    // return null if current contract is not using amendments
    if(lineItem.contract.field_2224 === "Yes") return null;

    const tofind = lineItem.contractAmendmentId;
    const dateWorked = lineItem.dateWorked;

    let response = await Knack.find({
        objectKey: internals.KNACK_OBJECTS_IDS.contractAmendment,
        filters: [{ field: "field_1112", operator: "is", value: tofind }],
    });

    response = response.records.find((c) => isMatchingAmendment(c, tofind, dateWorked));
    
    if (!response) throw new Error("No contract amendment found for this date worked.");

    return response;
}

module.exports = {
    findContractAmendmentForLineItems,
};