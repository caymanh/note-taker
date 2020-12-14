// LOAD DATA
// We are linking our routes to the "db"
// The db holds information on the notes taken.

const uniqid = require("uniqid");
const fs = require("fs");

// ROUTING
let notesArr = [];

module.exports = (app) => {
  //Function to read file
  // const readFile = () => {
  //   fs.readFile("./db/db.json", "utf8", (err, data) => {
  //     if (err) throw err;
  //     notesArr = JSON.parse(data);
  //     return notesArr;
  //   });
  // };

  const readFile = () => {
    const data = fs.readFileSync("./db/db.json", "utf8");
    notesArr = JSON.parse(data);
    return notesArr;
  };

  //Function to write file
  // const writeFile = () => {
  //   fs.writeFile("db/db.json", JSON.stringify(notesArr), (err) => {
  //     if (err) throw err;
  //     return true;
  //   });
  // };

  const writeFile = () => {
    fs.writeFileSync("db/db.json", JSON.stringify(notesArr));
  };

  // API GET Requests
  // Below code handles when users "visit" a page.
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the note)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", (req, res) => {
    readFile();
    res.json(notesArr);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // When a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a note... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    notesArr.push(newNote);
    writeFile();
    res.json(newNote);
    return console.log(`Added new note: ${newNote.title}`);
  });

  //API DELETE Requests
  app.delete("/api/notes/:id", (req, res) => {
    readFile();
    notesArr = notesArr.filter((note) => note.id !== req.params.id);
    writeFile();
    res.json(notesArr);
  });
};
