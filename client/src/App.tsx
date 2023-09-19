import RivalsForCatan from "./RivalsForCatan"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/documents/${uuidV4()}`} replace />}
          index
        />
        <Route path="/documents/:id" element={<RivalsForCatan />} />
      </Routes>
    </Router>
  )
}

export default App
