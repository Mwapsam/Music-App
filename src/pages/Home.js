import React from 'react'
import songs from '../services/data'
import styles from '../styles/Home.module.css'

const Home = () => {

  return (
    <div className={styles.song_grid}>
      {songs.map(song => (
        <div key={song.id} className={styles.song_card}>
          <div className={styles.song_content}>
            <h1 className={styles.song_title}>{song.title}</h1>
            <h2 className={styles.artist_name}>{song.artist}</h2>
          </div>
          <img src={song.image} alt={song.title} className={styles.song_image} />
        </div>
      ))}
    </div>
  )
}

export default Home