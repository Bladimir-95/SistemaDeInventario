import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CreatProducts from "./pages/procuts/createProducts/CreatProducts";
import GetProducts from "./pages/procuts/getProducts/GetProducts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/creatProduct" element={<CreatProducts />} />
            <Route path="/getProducts" element={<GetProducts />} />
          </Route >
        </Routes>
      </Router>
    </>
  );
}

export default App;
