const Knack = require("../../util/knack");
const knackObjects = require("../../util/knackObjects");

async function createLineItem(body) {
  try {
    const response = await Knack.createRecord({
      objectKey: knackObjects.lineItems,
      body,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createLineItem,
};
