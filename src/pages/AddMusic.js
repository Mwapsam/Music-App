import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from"firebase/storage";
import styles from '../styles/AddMusic.module.css'
import {db, collection, addDoc, Timestamp} from '../firebase'


const AddMusic = () => {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [image, setImage] = useState(null)
    const [mp3, setMp3] = useState(null)
 
    const [error, setError] = useState('');

    const sendMusic = async (e) => {
      e.preventDefault();
      try{
        if(!title || !artist || !image || !mp3) {
          setError('Please fill out all fields')
          return
          }
          const storage = getStorage();
      
          const imageRef = ref(storage, 'images/' + uuidv4());
          const mp3Ref = ref(storage, 'audio/' + uuidv4());
          await uploadBytesResumable(imageRef, image);
          await uploadBytesResumable(mp3Ref, mp3);
         
          const imageUrl = await getDownloadURL(imageRef);
          const mp3Url = await getDownloadURL(mp3Ref);
          
          const music = {
            title,
            artist,
            imageUrl,
            mp3Url,
            timestamp: Timestamp.now(),
          }
          await addDoc(collection(db, 'music'), music);
      } catch (error) {
        setError(error.message)
      }
        setTitle('');
        setArtist('');
        setImage(null);
        setMp3(null);
      }


  return (
    <div className={styles.music_card}>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.music_form} onSubmit={sendMusic}>
            <h3 className={styles.form_title}>Add Music</h3>
            <input type="text" className={styles.music_title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" className="form-control" placeholder="Artist" onChange={(e) => setArtist(e.target.value)} />
            <input type="file" accept="image/*" className={styles.image_input} placeholder="Image" onChange={(e) => setImage(e.target.files[0])} />
            <input type="file" accept="audio/*" className="form-control" placeholder="Song" onChange={(e) => setMp3(e.target.files[0])} />
            <button type="submit" className={styles.music_button}>Submit</button>
        </form>
    </div>
  )
}

export default AddMusic