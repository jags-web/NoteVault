import { useState } from "react"
import api from "../api/axios"

export default function NoteCard({ note, refresh }) {
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  // 🔄 UPDATE NOTE
  const handleUpdate = async () => {
    try {
      await api.put(`/api/notes/${note._id}`, {
        title,
        content
      })
      setIsEdit(false)
      refresh()
    } catch (err) {
      console.log(err)
    }
  }

  // ❌ DELETE NOTE
  const handleDelete = async () => {
    try {
      await api.delete(`/api/notes/${note._id}`)
      refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-md">
      {isEdit ? (
        <>
          <input
            className="w-full mb-2 p-2 rounded text-black"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full mb-3 p-2 rounded text-black"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
          />
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
          <p className="text-gray-300 mb-3">{note.content}</p>
        </>
      )}

      <div className="flex justify-end gap-2">
        {isEdit ? (
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-green-600 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-3 py-1 bg-blue-600 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
