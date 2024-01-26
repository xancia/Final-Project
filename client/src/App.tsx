import { Routes, Route } from "react-router-dom"

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/dealsearch" element={null} />
        <Route path="/dealsearch/:title" element={null} />
        <Route path="/contact" element={null} />
      </Routes>
    </>
  )
}

export default App
