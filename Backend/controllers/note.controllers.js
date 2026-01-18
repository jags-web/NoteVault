import Note from "../models/note.model.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "All fields required" });

    const note = await Note.create({
      title,
      content,
      user: req.userId // 🔑 logged-in user
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL NOTES FOR LOGGED-IN USER
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE NOTE (USER-SPECIFIC)
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // 🔑 check ownership
      { title, content },
      { new: true } // return updated document
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
