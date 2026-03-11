import Navbar from '../components/navbar/Navbar';
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-container">
        <Navbar />

        <main className="main-content">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout