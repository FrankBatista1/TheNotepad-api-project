const { model, Schema } = require("mongoose");

const notesSchema = new Schema({
  time: Number,
  blocks: [],
  version: String,
  uid: { type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = model('Notes', notesSchema);
