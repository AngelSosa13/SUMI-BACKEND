const { Router } = require("express");
const router = Router();
const noteModel = require("../models");

router.post("/add_note", async (req, res) => {
  const note = new noteModel(req.body);
  try {
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/", (req, res) => {
  res.json({ notesJson: ["Note", "hello world this is a note"] });
});
router.get("/notes", async (req, res) => {
  const allNotes = await noteModel.find({});
  try {
    res.send(allNotes);
    console.log(allNotes);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/notes/title/:title", async (req, res) => {
  const { title } = req.params;
  const regexQuery = new RegExp(title.replace("s+g", "%20"));
  console.log(regexQuery);
  try {
    // Find documents by title
    const query = { title: { $regex: title, $options: "i" } };
    const documents = await noteModel.find(query);

    if (documents.length === 0) {
      console.log("No documents found");
      return res.status(404).send("Not found");
    }

    res.send(documents);
    console.log(documents);
  } catch (err) {
    console.error("Error finding documents", err);
    res.status(500).send("Internal server error");
  }
});

/*router.get('/notes/:id',  (req, res) => {

  const id = parseInt(req.params.id)
  noteModel.find({id}).then(doc => {

    if (!doc) { return res.status(404).end() }
    return res.send(doc)
  }).catch(error => res.status(500).send(error))

})*/

module.exports = router;
