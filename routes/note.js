const express = require('express');
const cloudinary = require('cloudinary').v2;
const Note = require('../models/Note');
const router = express.Router();
const { getNotes, getOneNote, postANote, updateANote, deleteOneNote} = require("../controllers/notesController");
const { verifyJwt } = require("../middleware/verifyJwt");


//GET
router.route("/note/user/:id").get(verifyJwt, getNotes);

//GET 1 
router.route('note/user/:id').get( getOneNote);
//POST
router.route('note/user/:id').post(postANote)

//PUT note
router.route('/note/:id').put(updateANote)
//DELETE
router.route('/note/:id').delete(deleteOneNote)

module.exports = router;