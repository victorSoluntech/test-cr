const Request = require("promise-request-retry");
const QueryString = require("querystring");

const knack = {
  protocol: "https",
  host: "us-api.knack.com",
  apiVer: "/v1",
};

const knack_hipaa = {
  protocol: "https",
  host: "usgc-api.knack.com",
  apiVer: "/v1",
};

function getUri(hipaa) {
  return hipaa
    ? `${knack_hipaa.protocol}://${knack_hipaa.host}${knack_hipaa.apiVer}`
    : `${knack.protocol}://${knack.host}${knack.apiVer}`;
}

const acceptedErrorCodes = () => Array.from({ length: 52 }, (_, i) => 400 + i);

/**
 * The function `updateRecord` is an asynchronous function that updates a specific field on a record in
 * a Knack application using the Knack API.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function updateRecord(info) {
  try {
    // code to update the update on field on all records
    // TODO: send to a const file
    let objects = {
      object_1: "field_2260",
      object_2: "field_2261",
      object_3: "field_2262",
      object_4: "field_2263",
      object_6: "field_2264",
      object_47: "field_2265",
      object_10: "field_2266",
      object_11: "field_2267",
      object_12: "field_2268",
      object_25: "field_2269",
      object_26: "field_2270",
      object_27: "field_2302",
      object_31: "field_2271",
      object_33: "field_2272",
      object_37: "field_2273",
      object_41: "field_2274",
      object_42: "field_2275",
      object_35: "field_2276",
      object_44: "field_2277",
      object_45: "field_2278",
      object_49: "field_2279",
      object_51: "field_2280",
      object_56: "field_2281",
      object_58: "field_2282",
      object_57: "field_2283",
      object_61: "field_2284",
      object_54: "field_1968",
      object_60: "field_2285",
      object_67: "field_2286",
      object_70: "field_2155",
      object_76: "field_2287",
      object_77: "field_2288",
      object_40: "field_2289",
      object_36: "field_2290",
      object_29: "field_2291",
      object_24: "field_2292",
      object_20: "field_2293",
      object_21: "field_2294",
      object_22: "field_2295",
      object_39: "field_2296",
      object_13: "field_2297",
      object_23: "field_2298",
      object_30: "field_2299",
      object_74: "field_2300",
    };

    const updatedDate = new Date();

    if (objects[info.objectKey]) {
      info.body[objects[info.objectKey]] = updatedDate;
    }

    let hasHipa = info.hipaa;
    const options = {
      uri: `${getUri(hasHipa)}/objects/${info.objectKey}/records/${info.id}`,
      method: "PUT",
      form: info.body,
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (e) {
    console.log("error", e);
  }
}

/**
 * The function `createRecord` is an asynchronous function that creates a record using the provided
 * information.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function createRecord(info) {
  try {
    let hasHipa = info.hipaa;
    const options = {
      uri: `${getUri(hasHipa)}/objects/${info.objectKey}/records`,
      method: "POST",
      form: info.body,
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * The function `deleteRecord` is an asynchronous function that deletes a record from a Knack
 * application using the Knack API.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function deleteRecord(info) {
  try {
    let hasHipa = info.hipaa;
    const options = {
      uri: `${getUri(hasHipa)}/objects/${info.objectKey}/records/${info.id}`,
      method: "DELETE",
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * The function `findRecords` is an asynchronous function that retrieves records from a Knack
 * application based on the provided parameters.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function findRecords(info) {
  try {
    let hasHipa = info.hipaa;
    const query = QueryString.stringify({
      page: info.page || 1,
      rows_per_page: info.rowsPerPage || 1000,
      filters: JSON.stringify(info.filters || []),
    });
    const options = {
      uri: `${getUri(hasHipa)}/objects/${info.objectKey}/records?${query}`,
      method: "GET",
      json: true,
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * The function `findById` is an asynchronous function that retrieves a record by its ID from a Knack
 * application using the provided information.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function findById(info) {
  try {
    let hasHipa = info.hipaa;
    const options = {
      uri: `${getUri(hasHipa)}/objects/${info.objectKey}/records/${info.id}`,
      method: "GET",
      json: true,
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * The function `uploadFile` is an asynchronous function that uploads a file to a Knack application
 * using the Knack API.
 * @param info - The `info` parameter is an object that contains the following properties:
 * @returns the result of the `Request` function call.
 */
async function uploadFile(info) {
  try {
    info.type = info.type || "image";

    const options = {
      uri: `${getUri()}/applications/${process.env.KNACK_APP_ID}/assets/${
        info.type
      }/upload`,
      method: "POST",
      formData: info.body,
      headers: {
        "X-Knack-Application-ID": info.appID || process.env.KNACK_APP_ID,
        "X-Knack-REST-API-Key": info.apiKey || process.env.KNACK_API_KEY,
      },
      retry: 3,
      accepted: acceptedErrorCodes(),
      delay: 5000,
    };

    return Request(options);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUri,
  updateRecord,
  createRecord,
  deleteRecord,
  findRecords,
  findById,
  uploadFile,
};
