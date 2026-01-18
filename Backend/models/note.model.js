import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,

    // 👇 ye sabse important hai
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
