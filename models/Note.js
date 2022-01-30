const { model, Schema } = require("mongoose");

const notesSchema = new Schema({
  time: Number,
  blocks: [],
  version: String
});

module.exports = model('Notes', notesSchema);
