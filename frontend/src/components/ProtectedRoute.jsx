import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    api.get("/api/notes")
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return auth ? children : <Navigate to="/" />
}
