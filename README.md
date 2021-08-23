# Netlify Function for Bundenagentur für Arbeit Jobsuche

This repo provides a netlify function which wraps the [Arbeitsamt Jobsuche API](https://github.com/bundesAPI/jobsuche-api).

## Usage

Clone this repo and publish it with [Netlify](https://netlify.com) which then automatically will have an REST endpoint.

The REST endpoint will be available as `httsp://<<your-netlify-sitename>.netlify.app/.netlify/functions/jobs`

The query parameters (`was`, `wo`, etc) are the same as documented in the [bundesAPI repository](https://github.com/bundesAPI/jobsuche-api).

### Cors

You may as well want to change the `Access-Control-Allow-Origin` header to something that suits your needs (by default it is `*`).
