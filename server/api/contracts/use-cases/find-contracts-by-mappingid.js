const Knack = require("../../../util/knack");
const knackObjects = require("../../../util/knackObjects");
const { constractsFields } = require("../../../util/kanck-fields");
const { isDateInRange, isAfterDate } = require("../../../util/dates");

/**
 * Asynchronously finds a contract by its mapping ID and a specific date.
 *
 * @async
 * @function findContractByMappingId
 * @param {string} mappingId - The mapping ID of the contract to find.
 * @param {string} dateWorked - The date to filter the contracts by.
 * @returns {Promise<Object>} The contract that matches the provided mapping ID and date, if found.
 * @throws {Error} Throws an error if no mappingId is provided or if an error occurs while finding the contract.
 */
async function findContractByMappingId(mappingId, dateWorked) {
  // If mappingId is not provided, return an object with empty id
  if (!mappingId) throw new Error("Mapping ID cannot be blank.");

  if (isAfterDate(dateWorked))
    throw new Error("Date worked cannot be a future date.");

  try {
    // Fetch contracts based on the provided mappingId
    const contractResponse = await findContracts([
      { field: constractsFields.mappingId, operator: "is", value: mappingId },
    ]);

    // Find a contract where dateWorked falls between the contract's start and end dates
    const contract = filterContractsByDateWorked(contractResponse, dateWorked);

    if (contract.field_1739 !== "Yes")
      throw new Error("T&E cannot be added to this contract.");

    // Return the found contract
    return contract;
  } catch (error) {
    throw new Error(
      "An error occurred while finding the contract:" + error.message
    );
  }
}

/**
 * Asynchronously finds contracts based on provided filters.
 *
 * @async
 * @function findContracts
 * @param {Array<Object>} filters - An array of filter objects to apply. Each filter object should have `field`, `operator`, and `value` properties.
 * @returns {Promise<Array<Object>>} An array of contract records that match the provided filters.
 * @throws {Error} Throws an error if no contracts are found or if an error occurs while finding the contracts.
 */
async function findContracts(filters) {
  try {
    const contracts = await Knack.findRecords({
      objectKey: knackObjects.Contract,
      filters,
    });

    if (!contracts.records.length)
      throw new Error("No contract found with matching mapping ID.");

    return contracts.records;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Filters an array of contracts based on a specific date.
 *
 * @function filterContractsByDateWorked
 * @param {Array<Object>} contracts - An array of contract objects to filter. Each contract object should have `field_1446` and `field_1447` properties representing start and end dates, respectively.
 * @param {string} dateWorked - The date to filter the contracts by.
 * @returns {Array<Object>} An array of contracts where the `dateWorked` falls within the range of the contract's start and end dates.
 * @throws {Error} Throws an error if an error occurs while filtering the contracts.
 */
function filterContractsByDateWorked(contracts, dateWorked) {
  const contract = contracts.find((c) =>
    isDateInRange(dateWorked, c.field_602, c.field_603)
  );

  if (!contract) throw new Error("Date worked Outside of the Contract Period.");

  return contract;
}

module.exports = {
  findContractByMappingId,
};
