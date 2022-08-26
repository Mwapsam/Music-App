import React, { useRef } from 'react';
import { IoPlayForward, IoPlayBack } from 'react-icons/io5'
import styles from '../styles/Player.module.css'

const Player = ({music, audioElem, currentSong, setCurrentSong}) => {

  const clickRef = useRef();

  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * currentSong.length;

  }

  const skipBack = ()=> {
    const index = music.findIndex(song => song.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(music[music.length - 1])
    }
    else {
      setCurrentSong(music[index - 1])
    }
    audioElem.current.currentTime = 0;
  }


  const skiptoNext = ()=> {
    const index = music.findIndex(song => song.title === currentSong.title);

    if (index === music.length-1) {
      setCurrentSong(music[0])
    }
    else {
      setCurrentSong(music[index + 1])
    }
    audioElem.current.currentTime = 0;
  }
  
  
  return (
    <> 
      {currentSong && (<div >
          <div className="title">
            <p className={styles.player_title}>{currentSong.title}</p>
          </div>
          <div className={styles.navigation}>
            <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
              <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
            </div>
          </div>
        <div className="controls">
          <IoPlayBack className={styles.play_icon} onClick={skipBack}/>
          {/* {isplaying ? <CgPlayPauseO className={styles.play_icon} onClick={PlayPause}/> : <AiFillPlayCircle className={styles.play_icon} onClick={PlayPause}/>} */}
          <IoPlayForward className={styles.play_icon} onClick={skiptoNext}/>        
        </div>
    </div>)}
    </>
  )
}

export default Player