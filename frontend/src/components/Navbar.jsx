import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = async () => {
    await api.post("/logout")
    navigate("/")
  }

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-black/80 backdrop-blur-md
        border-b border-gray-700
        px-6 py-4
        flex justify-between items-center
        shadow-lg
      "
    >
      {/* ✨ Logo / Title */}
      <h1 className="text-xl font-extrabold tracking-wide
                     bg-gradient-to-r from-indigo-400 to-pink-500
                     bg-clip-text text-transparent">
        NoteVault
      </h1>

      {/* ✨ Logout Button */}
      <button
        onClick={logout}
        className="
          px-4 py-1.5 rounded-xl
          bg-red-600 text-white
          hover:bg-red-700
          shadow-md
          transition-all duration-300
        "
      >
        Logout
      </button>
    </nav>
  )
}
