import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import aiimage from "../../public/images/ai.jpg";
import "./PublicLayout.css";
import { RiMenuLine } from 'react-icons/ri'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <h1>Project <span id='span_id'>Pulse</span></h1>
            </div>
          </div>
        </nav>
        <header className="header__container">
          <div className="header__image">
            <img src={aiimage} alt="header" />
          </div>
          <div className="header__content">
            <h1>Let The<br />Final Year <span id='span_id'>Project </span> <br />Be The Best Of Yours!!!</h1>
              <div className="nav__btns">
                <button className="btn">
                  <Link>About Us</Link>
                </button>
                <button className="btn" >
                  <Link to="/register">Sign Up</Link>
                </button>
                <button className="btn">
                  <Link to="/login">Sign In</Link>
                </button>
              </div>
            <p>
              Final year project is like a hectic stuff to do,
              gather everyone around, collect all the information from group members,
              communicate and get guided by faculty.
              Dont worry we are here to help you out with that!!!
            </p>
          </div>
        </header>
      </div>
    </div>
  )
}

export default PublicLayout