const axios = require("axios");

const fetchRest = async (
  url,
  options = {},
  headers = {},
  retries = 5,
  retryTime = 1000,
  retryMethod = "long",
  maxRetryTime = 100000,
  retryOnNetworkError = true
) => {
  //* method will retry only on network errors and 429+ errors
  let forceStopRetry = false;

  try {
    // fetch will automatically throw error for network errors but not for HTTP errors (4xx, 5xx) those need to be handle with res.ok
    const res = await axios.post(url, options, headers);

    if (res.ok) {
      const isJson = res.headers
        .get("content-type")
        .includes("application/json");
      let data;
      data = isJson ? await res.json() : null;
      return data;
    }

    if (retries > 0 && res.status >= 429) {
      await new Promise((resolve) => setTimeout(resolve, retryTime));

      retryMethod === "long"
        ? (retryTime = retryTime * 3)
        : (retryTime = retryTime * 2);
      retryTime = retryTime > maxRetryTime ? maxRetryTime : retryTime;
      return fetchRest(url, options, retries - 1, retryTime, retryMethod);
    }

    //fetchError = (data && data.message) || res.status;
    let error = res.status;
    forceStopRetry = true;
    throw new Error(error);
  } catch (error) {
    if (retryOnNetworkError && !forceStopRetry && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryTime));
      retryMethod === "long"
        ? (retryTime = retryTime * 3)
        : (retryTime += retryTime * 2);
      retryTime = retryTime > maxRetryTime ? maxRetryTime : retryTime;
      return fetchRest(url, options, retries - 1, retryTime, retryMethod);
    } else {
      //we can do something with the error here or leave the catch in the calling function to make it more customizable
      //(error) => console.error(error.message));
      throw new Error(error);
    }
  }
};

module.exports = fetchRest;
