const Note = require("../models/Note");
const ErrorResponse = require("../utils/errorResponse");

exports.getNotes = async (req, res) => {
  const notes = await Note.find();
  try {
    if (notes.length === 0) {
      return next(new ErrorResponse("User doesn't have notes", 404));
    }
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Could not get the notes" });
  }
};
//GET 1
exports.getOneNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  try {
    return res.status(200).json(note);
  } catch {
    return res.status(500).json({ message: "Could not get the note" });
  }
};
//POST
exports.postANote = async (req, res) => {
  const noteCreated = await Note.create({
    times: req.body.times,
    blocks: req.body.blocks,
    version: req.body.version,
    uid: req.params.id,
  });
  try {
    return res.status(200).json(noteCreated);
  } catch {
    return res.status(500).json({ message: "Could not create the note" });
  }
};
// //POST image

//PUT note
exports.updateANote = async (req, res) => {
  const noteToUpdate = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(noteToUpdate);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldn't update note, check the server" });
  }
};
//DELETE
exports.deleteOneNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  try {
    return res.json({ message: "Product successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "ERROR could not delete product" });
  }
};
