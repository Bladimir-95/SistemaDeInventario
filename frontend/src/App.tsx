import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CreatProducts from "./pages/procuts/CreatProducts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/creatProduct" element={<CreatProducts />} />
          </Route >
        </Routes>
      </Router>
    </>
  );
}

export default App;
