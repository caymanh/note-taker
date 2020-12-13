// LOAD DATA
// We are linking our routes to the "db"
// The db holds information on the notes taken.

const notesData = require("../../../db/db.json");
const uniqid = require("uniqid");
const fs = require("fs");

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the note)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", (req, res) => {
    fs.readFile("../../../db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let notesArr = JSON.parse(data);
      res.json(notesArr);
    });
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (tableData.length < 5) {
      tableData.push(req.body);
      res.json(true);
    } else {
      waitListData.push(req.body);
      res.json(false);
    }
  });
};
