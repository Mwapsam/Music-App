import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
  } from '../firebase';
  import { login } from '../redux/auth/userSlice';
  import styles from '../styles/Signup.module.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(!email || !password || !name) {
            setError('Please fill all fields');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then( (userAuth) => {
                updateProfile(auth, name)
                    .then( () => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: userAuth.user.displayName,
                        }
                        ))
                        navigate('/login');
                    }).catch( (error) => {
                        Error(error);
                    }
                )
            }).catch( (error) => {
                setError(error.message);
            }
        )}

    const googleAuthProvider =  () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    const handleGoogleSignup = async (e) => {
        try {
            await googleAuthProvider();
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }
                 
  return (
    <div className={styles.main_card}>
        <div className={styles.signup_card}>
            <form onSubmit={handleSignup} className={styles.signup_form}>
                <h3 className={styles.form_title}>Register</h3>
                {error && <p>{error}</p>}
                <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={styles.button}>Register</button>
            </form>
        </div>
        <div className={styles.items_content}>
            <p>Already have an account? <a href="/login">Login</a></p>
            <div className={styles.google_btn} onClick={handleGoogleSignup}>
                <div className={styles.google_icon_wrapper}>
                    <img className={styles.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google'/>
                </div>
                <p className={styles.btn_text}><b>Signup with google</b></p>
            </div>
        </div>
    </div>
  )
}

export default Signup