import React, { useState, useEffect, useRef } from 'react'
import { Player } from '../components';
import { AiFillPlayCircle } from 'react-icons/ai'
import styles from '../styles/Home.module.css'
import {db, collection, query, orderBy, onSnapshot} from '../firebase'
import { truncate } from '../helpers'

const Home = () => {
  const [searchSong, setSearchSong] = useState('');
  const [music, setMusic] = useState([]);
  const [isplaying, setisplaying] = useState(false)
  const [currentSong, setCurrentSong] = useState()

  useEffect(() => {
    const q = query(collection(db, 'music'), orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setMusic(data)
    })
  }, [])

  console.log(music);

  const audioElem = useRef();

  useEffect(() => {
    if (!isplaying) {
      return
    }
    else if (isplaying) {
          audioElem.current.play();
      
    } else {
    audioElem.current.pause();
  }
  }, [isplaying])

  const playHandler = (data) => {
    if (data) {
      setCurrentSong(data)
    }
  }

  
  const songFilter = (e) => {
    setSearchSong(e.target.value.toLowerCase());
  }

  const Play = React.memo(Player)

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })
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
      <div className={styles.song_wrapper} >
        {music && music.filter((song) => {
          if (searchSong === '') {
            return song
          }
          return song.title.toLowerCase().includes(searchSong) || song.artist.toLowerCase().includes(searchSong)
        })
        .map((song) => (
          <div className={styles.song_container} key={song.id}>
              <button onClick={() => playHandler(song)} id={song.id} className={styles.btn_card} onTimeUpdate={onPlaying}>
                  <AiFillPlayCircle className={styles.play_icon} />
                  <img className={styles.song_img} src={song.imageUrl} alt={song.title} />
              </button>
              <h3 className={styles.song_artist}>{truncate(song.artist, 20)}</h3>
              <p className={styles.song_title}>{truncate(song.title, 15)}</p>
          </div>   
          
        ))}
        </div>
        {currentSong && (<div className={styles.player_card}>
          <audio controls src={currentSong.mp3Url} ref={audioElem} autoPlay onTimeUpdate={onPlaying} />
          <Play music={music} setMusic={setMusic} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      </div>)}
    </>
  )
}

export default Home