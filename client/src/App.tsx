
import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={null} />
        <Route path="/schedule" element={null} />
        <Route path="/login" element={null} />
      </Routes>
    </>
  )
}

export default App
