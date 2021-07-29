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
    const tokenData = await checkStatus(response);
    const accessToken = tokenData.access_token;

    let query = "";
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      query += `${key}=${value}&`;
    }
    query = query.substr(0, query.length - 1);

    const jobsResponse = await fetch(
      "https://api-con.arbeitsagentur.de/prod/jobboerse/jobsuche-service/pc/v2/app/jobs?FCT.AKTUALITAET=100&FCT.ANGEBOTSART=ARBEIT&" +
        query,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const jobsData = await jobsResponse.json();
    const jobs = jobsData._embedded;

    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(jobs),
    });
  } catch (error) {
    callback(error);
  }
};
