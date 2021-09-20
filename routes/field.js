const express = require('express');
const cloudinary = require('cloudinary').v2;
const Field = require('../models/Field');
const router = express.Router();
const { getFields, getOneField, postAField, updateAField, deleteOneField} = require("../controllers/fields");
const { protect } = require("../middleware/auth");


//GET
router.route("/").get(protect, getFields);

//GET 1 
router.route('/field/:id').get(protect, getOneField);
//POST
router.route('/field').post(protect, postAField)

//PUT field
router.route('/field/:id').put(protect, updateAField)
//DELETE
router.route('/field/:id').delete(protect, deleteOneField)

module.exports = router;