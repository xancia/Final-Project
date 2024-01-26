
import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dealsearch" element={null} />
        <Route path="/dealsearch/:title" element={null} />
        <Route path="/contact" element={null} />
      </Routes>
    </>
  )
}

export default App
