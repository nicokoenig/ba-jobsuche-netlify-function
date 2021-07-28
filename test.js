// curl
// -H 'Host: api-con.arbeitsagentur.de'
// -H 'Accept: */*'
// -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8'
// -H 'Cookie: JSESSIONID=DF392405E8F00714FBFE17EDAB5DDD98'
// -H 'Accept-Language: en-us'
// -H 'User-Agent: Jobsuche/1070 CFNetwork/1220.1 Darwin/20.3.0'
// --data-binary "client_id=c003a37f-024f-462a-b36d-b001be4cd24a&client_secret=32a39620-32b3-4307-9aa1-511e3d7f48a8&grant_type=client_credentials"
// --compressed 'https://api-con.arbeitsagentur.de/oauth/gettoken_cc'

const express = require("express");
const { curly } = require("node-libcurl");

// async function getToken() {
//   const res = await fetch(
//     "https://api-con.arbeitsagentur.de/oauth/gettoken_cc",
//     {
//       headers: {
//         Host: "api-con.arbeitsagentur.de",
//         Accept: "*/*",
//         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
//         Cookie: "JSESSIONID=DF392405E8F00714FBFE17EDAB5DDD98",
//         "Accept-Language": "en-us",
//         "User-Agent": "Jobsuche/1070 CFNetwork/1220.1 Darwin/20.3.0",
//       },
//       body: "client_id=c003a37f-024f-462a-b36d-b001be4cd24a&client_secret=32a39620-32b3-4307-9aa1-511e3d7f48a8&grant_type=client_credentials",
//     }
//   );
//   const data = await res.json();
//   return data.access_token;
// }

async function getToken() {
  const { data } = await curly.post(
    "https://api-con.arbeitsagentur.de/oauth/gettoken_cc",
    {
      postFields:
        "client_id=c003a37f-024f-462a-b36d-b001be4cd24a&client_secret=32a39620-32b3-4307-9aa1-511e3d7f48a8&grant_type=client_credentials",
      httpHeader: [
        "Host: api-con.arbeitsagentur.de",
        "Accept: */*",
        "Content-Type: application/x-www-form-urlencoded; charset=utf-8",
        "Cookie: JSESSIONID=DF392405E8F00714FBFE17EDAB5DDD98",
        "Accept-Language: en-us",
        "User-Agent: Jobsuche/1070 CFNetwork/1220.1 Darwin/20.3.0",
      ],
    }
  );
  return data.access_token;
}

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.end(await getToken());
});

app.listen(port, () => {});
