import React, { useState, useEffect } from 'react';
import {db, collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc} from '../firebase'
import styles from '../styles/AdminPlayList.module.css'
import { CustomPopup } from '../components'


const AdminPlayList = () => {
    const [music, setMusic] = useState([]);
    const [musicId, setMusicId] = useState('');
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [mp3Url, setMp3Url] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    

    const [visibility, setVisibility] = useState(false)
    
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

    useEffect(() => {
      let isMounted = true;
          const q = query(collection(db, 'music'), orderBy('timestamp', 'desc'));
          onSnapshot(q, (snapshot) => {
          const newMusic = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          if (isMounted) {
            setMusic(newMusic);
          }
        })
        return () => {
          isMounted = false;
        }
    } , [])
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const taskDocRef = doc(db, 'music', musicId)
        try {
          await updateDoc(taskDocRef, {
            title,
            artist,
            imageUrl,
            mp3Url,
          })
          setMessage('The song is successfully updated')
        } catch (err) {
          setError(error.message)
        }
    }

    const togglePopup = (data) => {
      setVisibility(!visibility)
      setMusicId(data.id)
      setTitle(data.title)
      setArtist(data.artist)
      setImageUrl(data.imageUrl)
      setMp3Url(data.mp3Url)
    }

    const handleDelete = async (data) => {
      const taskDocRef = doc(db, 'music', data.id)
      console.log(data.id);
        try{
          await deleteDoc(taskDocRef)
          setMessage('The song was successfully deleted')
        } catch (err) {
          alert(err)
        }
    }

  return (
    <>
        <h1>Admin Play List</h1>
          <ul className={styles.music_wrapper}>
            {message && <p>{message}</p>}
              {music.map(music => (
                  <div id={music.id} key={music.id}>
                    <li>
                        <div className={styles.music_container}>
                            <div className={styles.music_image}>
                                <img src={music.imageUrl} alt={music.title} />
                            </div>
                            <div className={styles.music_info}>
                                <h3>{music.title}</h3>
                                <p>{music.artist}</p>
                            </div>
                            <audio controls className={styles.audio_cont}>
                                <source src={music.mp3Url} type="audio/mpeg" />
                            </audio>
                            <div className={styles.btn}>
                              <div className={styles.music_buttons}>
                                  <button className={styles.music_button} onClick={() => togglePopup(music)}>Edit</button>
                              </div>
                              <div className={styles.music_buttons}>
                                  <button className={styles.music_button} onClick={() => handleDelete(music)}>Delete</button>
                              </div>
                            </div>
                        </div>
                      </li>
                      <div>
                      <CustomPopup
                        onClose={popupCloseHandler}
                        show={visibility}
                        music={music}
                      >
                          <div className="modal">
                              <div className="modal_content">
                                  <form  onSubmit={handleUpdate}>
                                      {message ? (<p>{message}</p>) : error && <p>{error}</p>}
                                      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}  />
                                      <input type="text"  placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)}  />
                                    <div >
                                      <label htmlFor="filePicker" >Image</label>
                                      <input type="file" id='filePicker' accept="image/*" placeholder="Image"  onChange={(e) => setImageUrl(e.target.file[0])} />
                              
                                    </div>
                                    <div >
                                      <label htmlFor="audioPicker" >Audio</label>
                                      <input type="file" accept="audio/*" id="audioPicker"  placeholder="Song" onChange={(e) => setMp3Url(e.tartget.file[0])}  />
                          
                                    </div>     
                                    <button type="submit" >Edit</button>
                                  </form>
                              </div>
                          </div>
                        </CustomPopup>
                      </div>
                   </div>
              ))}
          </ul>
    </>
  )
}

export default AdminPlayList