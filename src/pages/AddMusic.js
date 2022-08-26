import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from"firebase/storage";
import styles from '../styles/AddMusic.module.css'
import {db, collection, addDoc, Timestamp} from '../firebase';
import { LoadingSpinner } from '../components'


const AddMusic = () => {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [image, setImage] = useState(null)
    const [mp3, setMp3] = useState(null)

    const [isLoading, setIsLoading] = useState(false);

    const imageInputRef = useRef();
    const mp3InputRef = useRef();
 
    const [error, setError] = useState('');

    const sendMusic = async (e) => {
      e.preventDefault();
      setIsLoading(true);
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
          setTimeout( async () => {
            await addDoc(collection(db, 'music'), music);
           setIsLoading(false);
         }, 3000);
      } catch (error) {
        setError(error.message)
        setIsLoading(false);
      }
        setTitle('');
        setArtist('');
        imageInputRef.current.value = "";
        mp3InputRef.current.value = "";
        setImage(null);
        setMp3(null);
      }


  return (
    <div className={styles.music_card}>
        {error && <p className={styles.error}>{error}</p>}
        {isLoading ? <LoadingSpinner /> : (<form className={styles.music_form} onSubmit={sendMusic}>
            <h3 className={styles.form_title}>Add Music</h3>
              <input type="text" className={styles.music_title} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              <input type="text" className={styles} placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <div className={styles.inputs}>
              <label htmlFor="filePicker" className={styles.input_button}>Image</label>
              <input type="file" id='filePicker' accept="image/*" placeholder="Image" ref={imageInputRef} onClick={e => (e.target.value = null)} onChange={(e) => setImage(e.target.files[0])} />
      
            </div>
            <div className={styles.inputs}>
              <label htmlFor="audioPicker" className={styles.input_button}>Audio</label>
              <input type="file" accept="audio/*" id="audioPicker"  placeholder="Song" ref={mp3InputRef} onClick={e => (e.target.value = null)} onChange={(e) => setMp3(e.target.files[0])} />
   
            </div>     
            <button type="submit" className={styles.music_button} disabled={isLoading}>Submit</button>
        </form>)}
    </div>
  )
}

export default AddMusic