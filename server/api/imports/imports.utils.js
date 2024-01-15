/**
 * Gets the file URL from the import record.
 * @param {Object} importRecord - The import record object.
 * @returns {string} The URL of the file.
 */
function getFileUrl(importRecord) {
  return importRecord.field_1486_raw.url;
}

module.exports = {
  getFileUrl,
};
