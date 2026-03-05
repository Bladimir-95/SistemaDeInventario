import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
