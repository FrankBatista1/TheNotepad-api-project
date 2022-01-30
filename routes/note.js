const express = require('express');
const cloudinary = require('cloudinary').v2;
const Note = require('../models/Note');
const router = express.Router();
const { getNotes, getOneNote, postANote, updateANote, deleteOneNote} = require("../controllers/notesController");
const { protect } = require("../middleware/auth");


//GET
router.route("/").get(protect, getNotes);

//GET 1 
router.route('/field/:id').get(protect, getOneNote);
//POST
router.route('/field').post(protect, postANote)

//PUT field
router.route('/field/:id').put(protect, updateANote)
//DELETE
router.route('/field/:id').delete(protect, deleteOneNote)

module.exports = router;