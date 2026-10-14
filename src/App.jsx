import Home from "./pages/Home"
import Mood from "./pages/Mood"
import { Routes, Route, Navigate } from "react-router-dom"
import Favorite from "./pages/Favorite"
import About from "./pages/About"
import Login from "./pages/Login"
const App = () => {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/mood/:mood"
        element={<Mood/>}
      />
      <Route path="/mood" element={<Navigate to="/" replace />} />
      <Route 
      path="/favorites" 
      element={<Favorite />} 
      />
        <Route 
      path="/about" 
      element={<About />} 
      />
      <Route path="/login"
       element={<Login />}
        />
      <Route path="*" element={<Navigate to="/" replace />} />
     </Routes>


  )
}

export default App
