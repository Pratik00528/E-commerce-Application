import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiShoppingBag } from "react-icons/hi2";
import { useAuth } from '../../Context/Auth';
import toast from 'react-hot-toast';
import { Dashboard } from './../../pages/user/Dashboard';

export const Header = () => {
  const [auth, setAuth] = useAuth();

  // Handling Logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    // And also delete that user using our token value from our localStorage
    localStorage.removeItem("auth");
    setTimeout(() => { toast.success("Logged out successfully!") }, 1000);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="#">
              <HiShoppingBag style={{ color: "#52CC7A", size: "50px" }} /> E-commerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/category">
                  Category
                </NavLink>
              </li>
              {
                // If user is null then we show login and sign up buttons in Navbar
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>) :
                  // Else if user is not null then it means user is successfully logged in, so we show
                  // logout button in Navbar                      
                  (<>

                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item"
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                          Dashboard
                        </NavLink></li>

                        <li className="nav-item">
                          <NavLink className="dropdown-item" onClick={handleLogout} to="/login">
                            Logout
                          </NavLink>
                        </li>

                      </ul>
                    </li>


                  </>)

              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div >
      </nav >

    </>
  )
}
