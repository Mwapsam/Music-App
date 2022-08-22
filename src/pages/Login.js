import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styles from '../styles/Login.module.css';
import {
    auth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from '../firebase';
  import { login } from '../redux/auth/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            setError('Please fill all fields');
            return;
        }
        
        signInWithEmailAndPassword(auth, email, password)
            .then( (userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    password: userAuth.user.password,
                }
                ))
                navigate('/');
            }).catch( (error) => {
                console.log(error);
        
            })}

    const googleAuthProvider =  () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    const handleGoogleLogin = async (e) => {
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
            <form onSubmit={handleLogin} className={styles.signup_form}>
                <h3 className={styles.form_title}>Login</h3>
                {error && <p className={styles.errors}>{error}</p>}
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={styles.button}>Login</button>
                <div className={styles.google_btn} onClick={handleGoogleLogin}>
                <div className={styles.google_icon_wrapper}>
                    <img className={styles.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google'/>
                </div>
                    <p className={styles.btn_text}><b>Login with google</b></p>
                </div>
                <p className={styles.account_text}>Don't have an account? <a href="/signup">Register</a></p>
                <a href='/reset-password'>Forgot password?</a>
            </form>
        </div>
    </div>
  )
}

export default Login