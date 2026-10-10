import { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext()

const songKey = (song) => `${song.title}-${song.artist}`

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (song) => favorites.some((s) => songKey(s) === songKey(song))

  const toggleFavorite = (song) =>
    setFavorites((prev) =>
      prev.some((s) => songKey(s) === songKey(song))
        ? prev.filter((s) => songKey(s) !== songKey(song))
        : [...prev, song]
    )

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
export { songKey }