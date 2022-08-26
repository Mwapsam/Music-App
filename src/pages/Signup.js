import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
  } from '../firebase';
  import { login } from '../redux/auth/userSlice';
  import styles from '../styles/Signup.module.css';
  import { LoadingSpinner } from '../components';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendEmail = async () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            navigate('/email-verification');
        });
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!email || !password || !displayName) {
            setError('Please fill all fields');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then( (userAuth) => {
                updateProfile(auth, displayName)
                    .then( () => {
                        setTimeout( async () => {
                            dispatch(login({
                                email: userAuth.user.email,
                                uid: userAuth.user.uid,
                                displayName: userAuth.user.displayName,
                                password: userAuth.user.password,
                                emailVerified: userAuth.user.emailVerified,

                            }
                            ))
                            setIsLoading(false);
                        }, 3000)
                        sendEmail();
                    }).catch( (error) => {
                        Error(error);
                    }
                )
            }).catch( (error) => {
                setError(error.message);
                setIsLoading(false);
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
            {isLoading ? <LoadingSpinner /> : (<form onSubmit={handleSignup} className={styles.signup_form}>
                <h3 className={styles.form_title}>Register</h3>
                {error && <p className={styles.errors}>{error}</p>}
                <input type="text" placeholder="Username" value={displayName} onChange={(e) => setdisplayName(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={styles.button} disabled={isLoading}>Register</button>
                <div className={styles.google_btn} onClick={handleGoogleSignup}>
                <div className={styles.google_icon_wrapper}>
                    <img className={styles.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google'/>
                </div>
                    <p className={styles.btn_text}><b>Signup with google</b></p>
                </div>
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>)}
        </div>
    </div>
  )
}

export default Signup