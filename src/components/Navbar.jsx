import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  RiArrowDownSLine,
  RiUserLine,
  RiMenuLine,
  RiCloseLine,
} from "@remixicon/react"
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
  const drawerGradient =
    mood?.logo ?? "from-[#754084] via-[#4b245c] to-[#2b1239]"
  const accent = mood?.iconColor ?? "#BF89CE"
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moodsOpen, setMoodsOpen] = useState(false)
  const [mobileMoodsOpen, setMobileMoodsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 0)
  const normalizedQuery = query.trim().toLowerCase()
  const results = normalizedQuery
    ? moods.filter((item) => item.name.toLowerCase().includes(normalizedQuery))
    : []

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--scrollbar-color", mood?.iconColor ?? "#4e0363")
    return () => root.style.removeProperty("--scrollbar-color")
  }, [mood?.iconColor])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        setMoodsOpen(false)
        setMobileMoodsOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const goToMood = (item) => {
    navigate(`/mood/${item.value}`)
    setQuery("")
    setSearchOpen(false)
    setMoodsOpen(false)
    setMobileMoodsOpen(false)
    setMenuOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (results.length) goToMood(results[0])
  }

  const searchBox = (
    <form onSubmit={handleSubmit} className="relative w-full lg:w-auto">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setSearchOpen(true)
        }}
        onFocus={() => setSearchOpen(true)}
        onBlur={() => setSearchOpen(false)}
        className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-2
          font-display text-white placeholder-gray-400 backdrop-blur-md outline-none transition
          focus:border-(color:--accent) focus:ring-2 focus:ring-(color:--accent) lg:w-56"
        type="text"
        placeholder="Search by mood"
        aria-label="Search by mood"
        aria-autocomplete="list"
      />
      {searchOpen && normalizedQuery && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl
            border border-white/20 bg-black/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          {results.length ? (
            results.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onMouseDown={() => goToMood(item)}
                  onTouchEnd={(event) => {
                    event.preventDefault()
                    goToMood(item)
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left font-display
                    text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span>{item.name}</span>
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
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Main menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed left-0 top-0 z-100 h-dvh w-80 max-w-[88%] overflow-hidden
          border-r border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full "
          }`}
      >
        <div
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(rgba(9, 7, 18, 0.5), rgba(9, 7, 18, 0.65)), url("${mood?.image ?? "/bg5.jpg"}")`,
          }}
          className="pointer-events-none absolute inset-0 z-0 scale-105 bg-cover bg-center blur-xs "
        />
        <div className="relative z-10 flex h-full flex-col gap-5 overflow-y-auto p-6 ">
        <div className="flex shrink-0 items-center justify-between">
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

        <nav className="flex shrink-0 flex-col gap-1" aria-label="Pages">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-2 font-display text-lg text-white/90 transition
                hover:bg-white/10 hover:text-(color:--accent)"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <section>
          <button
            type="button"
            id="mobile-moods-heading"
            aria-expanded={mobileMoodsOpen}
            aria-controls="mobile-moods-list"
            onClick={() => setMobileMoodsOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl px-4  text-left
              font-display text-lg text-white/90 transition
              hover:bg-white/10  hover:text-(color:--accent)"
          >
            <span>Moods</span>
            <RiArrowDownSLine
              aria-hidden="true"
              size={22}
              className={`transition-transform duration-200 ${mobileMoodsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileMoodsOpen && (
            <nav id="mobile-moods-list" className="mt-2 grid grid-cols-2 gap-2" aria-label="Moods">
              {moods.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => goToMood(item)}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10
                    bg-black/20 px-3 py-2 text-left font-display text-sm text-white/85 transition
                    hover:bg-white/10 hover:text-white"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          )}
        </section>

        {searchBox}

        <div className="mt-auto shrink-0 border-t border-white/15 pt-5">
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
                bg-white/10 py-2 font-display text-sm  text-white transition hover:bg-white hover:text-black"
            >
              <RiUserLine size={16} />
              Log in / Sign up
            </Link>
          )}
        </div>
        </div>
      </aside>
    </div>,
    document.body,
  )

  return (
    <div
      style={{ "--accent": accent }}
      className={`sticky top-0 z-50 flex items-center justify-between bg-transparent px-4 py-4 transition-[backdrop-filter,box-shadow] duration-300 lg:px-6 lg:py-5 ${
        isScrolled
          ? "backdrop-blur-2xl shadow-[0_8px_20px_rgba(191,137,206,0.2)]"
          : "backdrop-blur-none shadow-none"
      }`}
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
        <Link to="/" aria-label="Moodify home">
          <h1
            className={`cursor-pointer bg-linear-to-r ${logo} bg-clip-text font-display text-2xl font-semibold text-transparent lg:text-3xl`}
          >
            Moodify
          </h1>
        </Link>
      </div>

      <nav
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-lg lg:flex"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="cursor-pointer font-display text-white transition-colors duration-300 hover:text-(color:--accent)"
          >
            {link.label}
          </Link>
        ))}
        <div
          className="py-3"
          onMouseEnter={() => setMoodsOpen(true)}
          onMouseLeave={() => setMoodsOpen(false)}
          onFocus={() => setMoodsOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMoodsOpen(false)
          }}
        >
          <button
            type="button"
            aria-expanded={moodsOpen}
            aria-controls="desktop-moods-menu"
            onClick={() => setMoodsOpen((value) => !value)}
            className="flex cursor-pointer items-center gap-1 font-display text-white transition-colors duration-300 hover:text-(color:--accent)"
          >
            Moods <RiArrowDownSLine size={18} />
          </button>
          {moodsOpen && (
            <div
              id="desktop-moods-menu"
              className={`absolute left-1/2 top-full z-[60] w-[min(34rem,90vw)] -translate-x-1/2 overflow-hidden rounded-2xl
                border border-white/15 bg-linear-to-r ${drawerGradient} p-4
                shadow-[0_16px_48px_rgba(0,0,0,0.5)]`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/30 backdrop-blur-2xl"
              />
              <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {moods.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => goToMood(item)}
                    className="flex items-center gap-3 rounded-xl border border-white/5 px-3 py-3 text-left
                      font-display text-sm text-white/85 transition hover:border-white/15 hover:bg-white/10 hover:text-white"
                  >
                    <span aria-hidden="true" className="text-lg">{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="hidden items-center gap-6 lg:flex">
        {searchBox}
        {loading ? (
          <div className="h-[30px] w-[30px]" aria-hidden="true" />
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
          <Link to="/login" aria-label="Log in or sign up" className="transition-transform duration-300 hover:scale-110">
            <RiUserLine size={30} color="white" />
          </Link>
        )}
      </div>
      {sidebar}
    </div>
  )
}

export default Navbar
