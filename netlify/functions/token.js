const fetch = require("node-fetch");

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

exports.handler = async function (event, context, callback) {
  try {
    const response = await fetch(
      "https://api-con.arbeitsagentur.de/oauth/gettoken_cc",
      {
        method: "POST",
        headers: {
          Host: "api-con.arbeitsagentur.de",
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Cookie: "JSESSIONID=DF392405E8F00714FBFE17EDAB5DDD98",
          "Accept-Language": "en-us",
          "User-Agent": "Jobsuche/1070 CFNetwork/1220.1 Darwin/20.3.0",
        },
        body: "client_id=c003a37f-024f-462a-b36d-b001be4cd24a&client_secret=32a39620-32b3-4307-9aa1-511e3d7f48a8&grant_type=client_credentials",
      }
    );
    const data = await checkStatus(response);
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    callback(error);
  }
};
