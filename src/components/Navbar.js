import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaHamburger } from 'react-icons/fa'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <nav className={styles.nav}>
        <div>
          <Link to="/" className={styles.logo}>Muzika</Link>
        </div>
        <button className={styles.hamburger} onClick={toggleNavbar}>
          <FaHamburger />
        </button>
        <div className={styles.navigation_menu}>
          <ul className={styles.nav_links}>
            <li className={styles.lists}>
              <Link to="/" className={styles.links}>Home</Link>
            </li>
            <li className={styles.lists}>
              <Link to="/about" className={styles.links}>About</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar