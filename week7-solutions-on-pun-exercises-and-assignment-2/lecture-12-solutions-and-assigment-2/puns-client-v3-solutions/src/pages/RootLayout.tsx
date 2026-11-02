import { NavLink, Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="logo">
          😄 Puns
        </NavLink>

        <nav>
          <NavLink to="/" end>All puns</NavLink>
          <NavLink to="/puns/new">Add a pun</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout