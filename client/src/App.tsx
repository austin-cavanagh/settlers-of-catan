import RivalsForCatan from "./RivalsForCatan"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={`/documents/${crypto.randomUUID()}`} replace />
          }
          index
        />
        <Route path="/documents/:id" element={<RivalsForCatan />} />
      </Routes>
    </Router>
  )
}

export default App
