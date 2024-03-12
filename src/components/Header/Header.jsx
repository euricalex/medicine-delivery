import React from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import './header.scss'
function Header() {
  return (
    <header className="header">
    <nav className="nav_header">
      <ul className="nav_list">
        <li className="logo_shop"><Link to="/">Shop</Link></li>
        <Link to="/cart"><TiShoppingCart className="shop_cart" /></Link>
      </ul>
    </nav>
  </header>
  )
}

export default Header
