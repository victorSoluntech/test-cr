// TODO: fix request error
// email procees csv file and tecard
const sendImportEmail = async (url, id) => {
  const options = {
    //uri: `https://api.knack.com/v1/pages/page_1303/views/view_3208/records/${id}`,
    uri: `${url}${id}`,
    method: "PUT",

    headers: {
      "X-Knack-Application-ID": process.env.KNACK_APP_ID,
      "X-Knack-REST-API-Key": process.env.KNACK_API_KEY,
    },
    retry: 3,
    accepted: [400, 404, 401, 403],
    delay: 5000,
  };

  return Request(options);
};

module.exports = {
  sendImportEmail,
};
