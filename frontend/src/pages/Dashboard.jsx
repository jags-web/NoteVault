import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"

export default function Dashboard() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    try {
      const res = await api.get("/api/notes")
      setNotes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addNote = async () => {
    // ✅ backend ke according dono fields required
    if (!title.trim() || !content.trim()) {
      alert("Title and content both required")
      return
    }

    try {
      await api.post("/notes", { title, content })
      setTitle("")
      setContent("")
      fetchNotes()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center p-4">
        <div className="w-full max-w-xl">

          {/* 🔹 Add Note Card */}
          <div className="p-6 rounded-3xl bg-black/60 backdrop-blur-md border border-gray-700 shadow-2xl">
            <input
              className="w-full mb-3 px-4 py-3 rounded-2xl
                         bg-black/40 border border-gray-700
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Note title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <textarea
              className="w-full px-4 py-3 rounded-2xl
                         bg-black/40 border border-gray-700
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         resize-none transition"
              placeholder="Write your private note..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={4}
            />

            <button
              onClick={addNote}
              className="w-full mt-4 py-3 rounded-2xl
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                         text-white font-semibold
                         shadow-lg hover:opacity-90 transition"
            >
              Add Note
            </button>
          </div>

          {/* 🔹 Notes List */}
          <div className="mt-5 space-y-3">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                refresh={fetchNotes}   // ✅ MOST IMPORTANT
              />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
