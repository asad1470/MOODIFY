import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { RiUserLine, RiMenuLine, RiCloseLine } from "@remixicon/react"
import { Link, useNavigate } from "react-router-dom"
import moods from "../moods"
import { useAuth } from "../AuthContext"
import Credit from "./Credit"
const links = [
  { to: "/", label: "Home" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
]

const Navbar = ({ mood }) => {
  const logo = mood?.logo ?? "from-white via-[#d9a8dc] to-[#852988]"
  const accent = mood?.iconColor ?? "#BF89CE"

  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const results = query.trim()
    ? moods.filter((m) =>
        m.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : []

  const goToMood = (m) => {
    navigate(`/mood/${m.value}`)
    setQuery("")
    setOpen(false)
    setMenuOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (results.length > 0) goToMood(results[0])
  }


  const searchBox = (
    <form onSubmit={handleSubmit} className="relative w-full lg:w-auto">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-2
          text-white placeholder-gray-400 backdrop-blur-md outline-none transition
          focus:border-(color:--accent) focus:ring-2 focus:ring-(color:--accent)
          font-display lg:w-56"
        type="text"
        placeholder="Search by mood"
      />

      {open && query.trim() && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl
            border border-white/20 bg-black/60 backdrop-blur-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        >
          {results.length > 0 ? (
            results.map((m) => (
              <li key={m.value}>
                <button
                  type="button"
                  onMouseDown={() => goToMood(m)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left font-display
                    text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span>{m.emoji}</span>
                  <span>{m.name}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 font-display text-sm text-white/60">
              No mood found
            </li>
          )}
        </ul>
      )}
    </form>
  )


  const sidebar = createPortal(
    <div style={{ "--accent": accent }} className="lg:hidden">
    
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

   =
      <aside
        className={`fixed left-0 top-0 z-[100] flex h-full w-72 max-w-[85%] flex-col gap-6
          border-r border-white/20 bg-black/10 p-6 backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`bg-linear-to-r ${logo} bg-clip-text font-display text-2xl font-semibold text-transparent`}
          >
            Moodify
          </h2>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer text-white/80 transition hover:text-white"
          >
            <RiCloseLine size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-display text-lg text-white/90 transition
                hover:bg-white/10 hover:text-(color:--accent)"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {searchBox}

      
        <div className="mt-auto border-t border-white/15 pt-5">

 <div className="mb-5">
    <Credit variant="menu" />
  </div>

          {loading ? null : user ? (
            <div className="flex flex-col gap-3">
              <p className="truncate font-display text-white/80">
                {user.name || user.email}
              </p>
              <button
                type="button"
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="cursor-pointer rounded-full border border-white/30 bg-white/10 py-2
                  font-display text-white transition hover:bg-white hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/30
                bg-white/10 py-2 font-display text-white transition hover:bg-white hover:text-black"
            >
              <RiUserLine size={20} />
              Log in / Sign up
            </Link>
          )}
        </div>
      </aside>
    </div>,
    document.body
  )

  return (
    <div
      style={{ "--accent": accent }}
      className="relative flex items-center justify-between bg-transparent px-4 py-4 lg:px-6 lg:py-5"
    >
     
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="cursor-pointer text-white transition hover:text-(color:--accent) lg:hidden"
        >
          <RiMenuLine size={30} />
        </button>

        <Link to="/">
          <h1
            className={`cursor-pointer bg-linear-to-r ${logo} bg-clip-text text-2xl font-semibold text-transparent font-display lg:text-3xl`}
          >
            Moodify
          </h1>
        </Link>
      </div>

    
      <div className="absolute left-1/2 hidden -translate-x-1/2 gap-10 text-lg lg:flex">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="font-display cursor-pointer text-white transition-colors duration-500 hover:text-(color:--accent)"
          >
            {l.label}
          </Link>
        ))}
      </div>

    
      <div className="hidden items-center gap-6 lg:flex">
        {searchBox}

        {loading ? (
          <div className="h-[30px] w-[30px]" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="font-display text-white/80">
              {user.name || user.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer font-display text-sm text-white/70 transition-colors hover:text-(color:--accent)"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="transition-transform duration-300 hover:scale-110">
            <RiUserLine size={30} color="white" />
          </Link>
        )}
      </div>

      {sidebar}
    </div>
  )
}

export default Navbar