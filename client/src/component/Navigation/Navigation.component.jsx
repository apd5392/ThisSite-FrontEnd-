import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navigation.styles.css'
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/search">
            SEARCH
          </Link>

          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation