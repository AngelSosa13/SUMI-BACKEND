const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const noteSchema = mongoose.model("notes", NotesSchema);

module.exports = noteSchema;
