const Field = require("../models/Field");

exports.getFields = (async (req, res) => {
  const fields = await Field.find();
  try{
    return res.status(200).json(fields);
  } catch (error){
    return res.status(500).json({message: "Could not get the fields"});
  }
})
//GET 1 
exports.getOneField = (async (req, res) => {
  const field = await Field.findById(req.params.id);
  try{
    return res.status(200).json(field)
  } catch{
    return res.status(500).json({message: "Could not get the field"})
  }
})
//POST
exports.postAField = (async (req, res) => {
  const fieldCreated = await Field.create({
    times: req.body.times,
    blocks: req.body.blocks,
    version: req.body.version,
  })
  try{
    return res.status(200).json(fieldCreated);
  } catch{
    return res.status(500).json({message: "Could not create the field"})
  }
})
// //POST image

//PUT field
exports.updateAField = (async (req, res) => {
  const fieldToUpdate = await Field.findByIdAndUpdate(req.params.id, req.body, {new: true});
  try {
    return res.status(202).json(fieldToUpdate);
  } catch (error) {
    return res.status(500).json({message: "Couldn't update field, check the server"});
  }
})
//DELETE
exports.deleteOneField = (async (req, res) => {
  const { id } = req.params;
  await Field.findByIdAndDelete(id);
  try {
    return res.json({message: "Product successfully deleted"});
  } catch (error) {
    return res.status(500).json({message: "ERROR could not delete product"});
  }
})
