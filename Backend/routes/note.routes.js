import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} from "../controllers/note.controllers.js";
import protectRoute from "../middleware/auth.middleware.js";

const noteRoute = express.Router();

// All routes are protected
noteRoute.post("/", protectRoute, createNote); // create note
noteRoute.get("/", protectRoute, getNotes); // all notes
noteRoute.get("/:id", protectRoute, getNote); // single note
noteRoute.put("/:id", protectRoute, updateNote); // update note
noteRoute.delete("/:id", protectRoute, deleteNote); // delete note

export default noteRoute;