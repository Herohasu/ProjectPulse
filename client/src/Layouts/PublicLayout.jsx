import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import aiimage from "../../public/images/ai.jpg";
import "./PublicLayout.css";
import { RiMenuLine } from 'react-icons/ri'

const PublicLayout = () => {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin')

      } else {
        navigate('/')
      }
    }

  }, [user, navigate])

  return (
    <div>
      <Outlet />
      <div>
        <nav>
          <div className="nav__header">
            <div className="nav__logo">
              <a href="#">Project<span>Pulse</span>.</a>
            </div>
            <div className="nav__menu__btn" id="menu-btn">
              <img src={<RiMenuLine/>}></img>
              {/* <span><i class="ri-menu-line"></i></span> */}
            </div>
          </div>
          <ul className="nav__links" id="nav-links">
            <li><a href="#">About Us</a></li>
          </ul>
          <div className="nav__btns">
            <button className="btn sign__up" >
              <Link to="/register">Sign Up</Link>
            </button>
            <button className="btn sign__in">
              <Link to="/login">Sign In</Link>
            </button>
          </div>
        </nav>
        <header className="header__container">
          <div className="header__image">
            <img src={aiimage} alt="header" />
          </div>
          <div className="header__content">
            <h1>Let The<br />Final Year <span>Project </span> <br />Be The Best Of Yours!!!</h1>
            <p>
              Final year project is like a hectic stuff to do,
              gather everyone around, collect all the information from group members,
              communicate and get guided by faculty.
              Dont worry we are here to help you out with that!!!
            </p>
            <form action="/">
              <div className="input__group">
                <h5>Date</h5>
                <div>
                  <span><i className="ri-calendar-2-line"></i></span>
                  <input type="text" placeholder="17 July 2024" />
                </div>
              </div>
            </form>
            <div className="bar">
              This is a our demo landing page...
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}

export default PublicLayout