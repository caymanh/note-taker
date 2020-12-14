// LOAD DATA
// We are linking our routes to the "db"
// The db holds information on the notes taken.

const uniqid = require("uniqid");
const fs = require("fs");

// ROUTING
let notesArr = [];

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the note)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      notesArr = JSON.parse(data);
      res.json(notesArr);
    });
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // When a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a note... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    uniqid();
    const newNote = req.body;
    notesArr.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notesArr), (err) => {
      if (err) throw err;
      return true;
    });
    res.json(newNote);
    return console.log(`Added new note: ${newNote.title}`);
  });
};
