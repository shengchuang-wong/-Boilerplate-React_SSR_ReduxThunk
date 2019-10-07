import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">React SSR</Link>
        <ul className="right">
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header);