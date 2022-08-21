import React, { useState, useEffect } from 'react'
import {doc, db, collection, updateDoc, query, orderBy, onSnapshot} from '../firebase'
import styles from '../styles/AdminPlayList.module.css'
import { CustomPopup } from '../components'


const AdminPlayList = () => {
    const [music, setMusic] = useState([]);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [image, setImage] = useState('');
    const [mp3, setMp3] = useState('');

    const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

    useEffect(() => {
      const q = query(collection(db, 'music'), orderBy('timestamp', 'desc'));
      onSnapshot(q, (snapshot) => {
        const newMusic = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setMusic(newMusic);
      }
      )
    } , [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        
    }

  return (
    <>
        <h1>Admin Play List</h1>
          <ul>
              {music.map(music => (
                   <div key={music.id}>
                    <li>
                        <div className={styles.music_container}>
                            <div className={styles.music_image}>
                                <img src={music.imageUrl} alt={music.title} />
                            </div>
                            <div className={styles.music_info}>
                                <h3>{music.title}</h3>
                                <p>{music.artist}</p>
                            </div>
                            <audio controls>
                                <source src={music.mp3Url} type="audio/mpeg" />
                            </audio>
                            <div className={styles.music_buttons}>
                                <button className={styles.music_button} onClick={(e) => setVisibility(!visibility)}>Edit</button>
                            </div>
                        </div>
                      </li>
                      <div>
                      

                        <CustomPopup
                          onClose={popupCloseHandler}
                          show={visibility}
                          title="Edit song"
                        >
                          <div className="modal">
                                <div className="modal_content">
                                    <form onSubmit={handleUpdate}>
                                        <input type="text" className={styles.music_title} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={title} />
                                        <input type="text" className={styles} placeholder="Artist" onChange={(e) => setArtist(e.target.value)} />
                                      <div className={styles.inputs}>
                                        <label htmlFor="filePicker" className={styles.input_button}>Image</label>
                                        <input type="file" id='filePicker' accept="image/*" placeholder="Image" onChange={(e) => setImage(e.target.files[0])} />
                                
                                      </div>
                                      <div className={styles.inputs}>
                                        <label htmlFor="audioPicker" className={styles.input_button}>Audio</label>
                                        <input type="file" accept="audio/*" id="audioPicker"  placeholder="Song" onChange={(e) => setMp3(e.target.files[0])} />
                            
                                      </div>     
                                      <button type="submit"  className={styles.music_button}>Edit</button>
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