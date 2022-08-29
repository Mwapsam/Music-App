import React, { useRef, useState } from 'react'
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from"firebase/storage";
import { db, addDoc, collection, Timestamp } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const AddCategory = () => {
    const [error, setError] = useState('')
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState('')
    const name = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const storage = getStorage();
      
            const imageRef = ref(storage, 'images/' + uuidv4());
            await uploadBytesResumable(imageRef, image);

            const imageUrl = await getDownloadURL(imageRef);

            const category = {
                name: name.current.value,
                image: imageUrl,
                timestamp: Timestamp.now(),
            }

            setTimeout( async () => {
                await addDoc(collection(db, 'category'), category);
                setMessage('Category successfully created!')
            }, 3000);
        } catch (err) {
            setError(err.message)
        }

        e.target.reset();

    }

  return (
    <>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
            <input ref={name} type="text" required />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
            <button type="submit">Add</button>
      </form>
    </>
  )
}

export default AddCategory