const axios = require('axios').default;
const axiosRetry = require('axios-retry').default

const Knack = require("../../util/knack");
const knackObjects = require("../../util/knackObjects");

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

/**
 * Asynchronously deletes an import log by its ID.
 *
 * @async
 * @function deleteImportById
 * @param {string} id - The ID of the import log to delete.
 * @returns {Promise<void>} No return value.
 * @throws {Error} Throws an error if an error occurs while deleting the import log.
 */
async function deleteImportById(id) {
  try {
    console.log("[deleteImportById] start");

    await Knack.deleteRecord({
      objectKey: knackObjects.teImportLog,
      id,
    });

    console.log("[deleteImportById] end");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateRecord(id, body){
  try {
    await Knack.update({
      objectKey: knackObjects.teImportLog,
      id,
      body,
    });
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Downloads the content of a file from a given URL.
 *
 * @async
 * @function getFileContent
 * @param {string} url - The URL of the file to download.
 * @returns {Promise<string>} A promise that resolves with the content of the file.
 * @throws {Error} Throws an error if there is an issue downloading the file.
 */
async function getFileContent(url) {
  try {
    console.log("[getFileContent] start");

    const response = await axios.get(url, { timeout: 150000 });

    console.log("[getFileContent] end");

    return response.data;
  } catch (error) {
    throw new Error("Error downloading file: " + error.message);
  }
}

module.exports = {
  updateRecord,
  deleteImportById,
  getFileContent,
};
