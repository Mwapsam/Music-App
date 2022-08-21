import React from 'react'
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from "react-audio-player";
import { Home } from '../pages';
import songs from '../services/data'
import styles from '../styles/Player.module.css'

const Player = () => {
    const { name } = useParams();
    const song = songs.find(song => song.title === name);
    const { title, artist, image, mp3 } = song;
  return (
    <> 
        <Home />
        <div className={styles.player_card}>
            <img src={image} alt={title} className={styles.player_img} />
            <ReactAudioPlayer src={mp3} controls className={styles.player_controls} />
            <div>
                <h1 className={styles.player_title}>{title}</h1>
                <h2 className={styles.player_artist}>{artist}</h2>
            </div>
        </div>
    </>
  )
}

export default Player