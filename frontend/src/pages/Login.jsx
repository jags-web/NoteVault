import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    if (!email.trim() || !password.trim()) return; // prevent empty login
    await api.post("/api/login", { email, password })
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* ✨ Glassmorphic Login Card */}
      <div className="w-96 p-8 rounded-3xl bg-black/60 backdrop-blur-md shadow-2xl border border-gray-700">
        
        <h1 className="text-4xl font-extrabold text-white text-center mb-1 tracking-wide">
          NoteVault
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Your private notes, secured 🔐
        </p>

        {/* ✨ Inputs */}
        <input
          type="email"
          className="w-full bg-black/30 border border-gray-600 rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-black/30 border border-gray-600 rounded-xl px-4 py-3 mb-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* ✨ Login Button */}
        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Login
        </button>

        {/* ✨ Signup Link */}
        <p className="text-sm text-center mt-6 text-gray-400">
          No account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 font-semibold transition-colors">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}
