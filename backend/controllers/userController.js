const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const allNotes = asyncHandler(async (req, res) => {
  const { userId } = req;
  try {
    const notes = await Note.find({ userId });
    res.status(201).json(notes);
  } catch (err) {
    res.status(400);
    throw new Error("Some Error Occurred");
  }
});

const createNote = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const newNote = await Note.create({ title, content, category, userId });

  if (newNote) res.status(201).json(newNote);
  else {
    res.status(500);
    throw new Error("Some Error has Occured");
  }
});

const getNote = asyncHandler(async (req, res) => {
  const noteFound = await Note.findById(req.params.noteId);
  if (noteFound) res.json(noteFound);
  else {
    res.status(401);
    throw new Error("Note Doesn't Exist");
  }
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const noteFound = await Note.findById(req.params.noteId);
    if (noteFound) {
      if (noteFound.userId.toString() !== req.userId.toString()) {
        res.status(403);
        throw new Error("Forbidden Request");
      }
      noteFound.title = req.body.title;
      noteFound.content = req.body.content;
      noteFound.category = req.body.category;
      const resp = await noteFound.save();
      res.json(resp);
    } else {
      res.status(401);
      throw new Error("Note Doesn't Exist");
    }
  } catch (error) {
    if (res.statusCode !== 400) throw error;
    res.status(400);
    throw new Error("Invalid ObjectId");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const noteFound = await Note.findById(req.params.noteId);
    if (noteFound) {
      if (noteFound.userId.toString() !== req.userId.toString()) {
        res.status(403);
        throw new Error("Forbidden Request");
      }
      const resp = await Note.deleteOne({ _id: req.params.noteId });
      res.json({ message: "Note Deleted", deletedCount: resp.deletedCount });
    } else {
      res.status(401);
      throw new Error("Note Doesn't Exist");
    }
  } catch (error) {
    if (res.statusCode !== 400) throw error;
    res.status(400);
    throw new Error("Invalid ObjectId");
  }
});

module.exports = { allNotes, createNote, getNote, updateNote, deleteNote };
