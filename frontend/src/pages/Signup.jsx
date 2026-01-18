import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

export default function Signup() {
  const [form, setForm] = useState({ name: "", userName: "", email: "", password: "" })
  const navigate = useNavigate()

  const signup = async () => {
    if (!form.name || !form.userName || !form.email || !form.password) return
    await api.post("/signup", form)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* ✨ Glassmorphic Signup Card */}
      <div className="w-96 p-8 rounded-3xl bg-black/60 backdrop-blur-md shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white text-center mb-1 tracking-wide">
          Signup
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Create your secure private account 🔐
        </p>

        {/* ✨ Input Fields */}
        {["name", "userName", "email", "password"].map(f => (
          <input
            key={f}
            type={f === "password" ? "password" : "text"}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            className="w-full bg-black/30 border border-gray-600 rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        ))}

        {/* ✨ Signup Button */}
        <button
          onClick={signup}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Signup
        </button>

        {/* ✨ Login Link */}
        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-500 hover:text-indigo-400 font-semibold transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
