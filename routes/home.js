const db = require("../database/connection.js");
const { sendFacts } = require("../database/model.js");

// render form on the homepage
function homePage(request, response) {
  const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="./index.css">
        <link rel="icon" type="image/png" href="/moonet-logo.png" />
        <title>Document</title>
      </head>
      <body>
        <h1>Who-said-that</h1>
        ${form}
        <a href="/display_facts">View All Facts</a>
      </body>
      </html>`;
  response.send(html);
}

// body parser give info from add fact function
// allows us to access info from the request.body to retrieve input values.
function addFact(request, response) {
  const firstName = request.body.first_name;
  const cohort = request.body.cohort;
  const facts = request.body.facts;

  // call function from model.js file
  sendFacts(firstName, cohort, facts);
  response.redirect("/");
}

const form = `<form method="POST">
  <label for="first_name">Name</label>
  <input required id="first_name" type="text" name="first_name" />
  <label for="cohort">Cohort</label>
  <input required id="cohort" type="number" name="cohort" />
  <label for="facts">Fact</label>
  <textarea required id="facts" type="text" name="facts"></textarea>
  <input required value="facts" type="submit" />
</form>`;

module.exports = { homePage, addFact };
