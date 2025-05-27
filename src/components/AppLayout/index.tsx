import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Navbar from "../Navbar"

const AppLayout = () => {
  
  return (
       <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
