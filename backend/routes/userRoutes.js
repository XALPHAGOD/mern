const express = require("express");
const {
  allNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/userController");

const router = express.Router();

router.route("/notes").get(allNotes);
router.route("/create").post(createNote);

router.route("/note/:noteId").get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
