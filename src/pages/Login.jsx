import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext"
import Navbar from "../components/Navbar"
import Credit from "../components/Credit"

const errors = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/email-already-in-use": "That email already has an account.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/invalid-email": "Please enter a valid email.",
}

const input =
  "w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-gray-400 outline-none transition focus:border-(color:--accent) focus:ring-2 focus:ring-(color:--accent) font-display"

const Login = () => {
  const { user, login, signup } = useAuth()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setBusy(true)
    try {
      if (isSignup) await signup(name, email, password)
      else await login(email, password)
      navigate("/")
    } catch (err) {
      setError(errors[err.code] ?? "Something went wrong. Try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-scroll lg:bg-fixed"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto  w-full max-w-sm px-6 flex items-center justify-center mt-30">
          <form
            onSubmit={handleSubmit}
            style={{ "--accent": "#BF89CE" }}
            className="flex flex-col gap-4 rounded-3xl border border-white/25 bg-white/10 p-8
              backdrop-blur-2xl backdrop-saturate-150
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.25)]"
          >
            <h1 className="text-center font-display text-3xl font-bold text-white">
              {isSignup ? "Create account" : "Welcome back"}
            </h1>
            <p className="text-center text-sm text-white/70">
              {isSignup ? "Join Moodify and find your vibe." : "Log in to keep the music going."}
            </p>

            {isSignup && (
              <input className={input} placeholder="Name" value={name}
                onChange={(e) => setName(e.target.value)} required />
            )}
            <input className={input} type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
            <input className={input} type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />

            {error && <p className="text-center text-sm text-pink-300">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="cursor-pointer rounded-full border border-white/30 bg-white/20 py-3
                font-display font-semibold text-white transition hover:bg-white hover:text-black
                disabled:opacity-50"
            >
              {busy ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
            </button>

            <p className="text-center text-sm text-white/70">
              {isSignup ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => { setIsSignup(!isSignup); setError("") }}
                className="cursor-pointer font-semibold text-white underline-offset-4 hover:underline"
              >
                {isSignup ? "Log in" : "Sign up"}
              </button>
            </p>

            <Link
              to="/"
              className="text-center font-display text-sm text-white/60 transition-colors hover:text-white"
            >
              Continue without logging in
            </Link>
          </form>
        </div>
      </div>
      <Credit />
    </div>
  )
}

export default Login
