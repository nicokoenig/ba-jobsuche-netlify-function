// import fetch from 'node-fetch';
const fetch = require("node-fetch");

const checkStatus = (res) => {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

exports.handler = async function (event, context, callback) {
  try {
    const response = await fetch("https://krautipsum.com/api/noun");
    const data = await checkStatus(response);
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    callback(error);
  }
};
