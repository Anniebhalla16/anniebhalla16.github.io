import { Outlet } from "react-router-dom"

const AppLayout = () => {
  
  return (
        <div className="min-h-screen bg-red-300 text-white flex flex-col align-top">
<div>Navbar</div>
<Outlet/>
<div>Footer</div>
</div>
  )
}

export default AppLayout
