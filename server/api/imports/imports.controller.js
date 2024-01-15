const Response = require("../../util/response");
const importsService = require("./imports.service");

/**
 * Imports time expense cards.
 * .
 * @async
 * @function importTimeExpenseCards
 * @param {Object} request - The request object.
 * @param {Object} h - The response toolkit.
 * @returns {Promise<Object>} An object containing the status and message of the operation.
 * @throws {Error} Throws an error if an error occurs while importing the time expense cards.
 */
async function importTimeExpenseCards(request, h) {
  const payload = request.payload;

  try {
    const lineItems = await importsService.importExpenseCards(payload);

    await importsService.importExpenseCardsWorkflow(lineItems, payload);

    return new Response(
      "ok",
      "Processing file, you will receive an email once the process has finished"
    );
  } catch (error) {
    console.error(error.message);

    return new Response("error", error.list ?? error.message);
  }
}

module.exports = {
  importTimeExpenseCards,
};
