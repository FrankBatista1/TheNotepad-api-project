const { model, Schema } = require("mongoose");

const fieldSchema = new Schema({
  time: Number,
  blocks: [],
  version: String
});

module.exports = model('Field', fieldSchema);
