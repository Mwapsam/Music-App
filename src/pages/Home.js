import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import songs from '../services/data'
import { AiFillPlayCircle } from 'react-icons/ai';
import styles from '../styles/Home.module.css'

const Home = () => {
  const [searchSong, setSearchSong] = useState('');
  
  const songFilter = (e) => {
    setSearchSong(e.target.value.toLowerCase());
  }

  return (
    <>
      <div className={styles.search_form}>
        <input type="text" 
        placeholder="Search the song" 
        className={styles.search_input} 
        onChange={songFilter}
        value={searchSong}
        />
      </div>
      <div className={styles.song_grid}>
      {songs.filter((song) => {
        if (searchSong === '') {
          return song
        }
        return song.title.toLowerCase().includes(searchSong)
      })
      .map(song => (
        <Link to={{pathname: `/music/${song.title}`}} key={song.id} className={styles.song_card}>
          <div className={styles.song_content}>
            <h1 className={styles.song_title}>{song.title}</h1>
            <h2 className={styles.artist_name}>{song.artist}</h2>
          </div>
          <AiFillPlayCircle className={styles.play_icon} />
          <img src={song.image} alt={song.title} className={styles.song_image} />
        </Link>
      ))}
    </div>
    </>
  )
}

export default Home