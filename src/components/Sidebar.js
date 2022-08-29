import React from 'react'
import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
  return (
    <div>
        <ul className={styles.main}>
            <li>
                <h1>Categories</h1>
            </li>
            <li className={styles.lists}>
                <a href="/">Gospel</a>
                <a href="/">Zed</a>
                <a href="/">Afrobeats</a>
                <a href="/">Hip Hop</a>
                <a href="/">R&B</a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar