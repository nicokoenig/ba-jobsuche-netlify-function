const { curly } = require("node-libcurl");

exports.handler = async function getToken() {
  const { data } = await curly.get("https://krautipsum.com/api/kraut");

  return {
    statusCode: 200,
    body: data.kraut,
  };
};
