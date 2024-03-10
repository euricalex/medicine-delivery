import React from 'react'
import styles from '../scss/components/Header.module.scss'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className={styles.header}>
        <nav className={styles.nav_header}>
        <ul className={styles.nav_list}>
        <li className={styles.logo_shop}><Link to="/">Shop</Link></li>
        <Link to='/cart'> <TiShoppingCart className={styles.shop_cart}></TiShoppingCart></Link>
        </ul>
        </nav>
    </header>
  )
}

export default Header
