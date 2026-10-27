import { NavLink, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
        <header>
            <nav>
                <NavLink to="/">Home</NavLink> | <NavLink to="/notes" end>Notes</NavLink> | <NavLink to="/about">About</NavLink>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>

        <footer>
            {new Date().getFullYear()} @ All rights reserved
        </footer>
    </div>
  )
}

export default RootLayout