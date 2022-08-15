import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from '../firebase';
  import { login } from '../redux/auth/userSlice';

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

                        
                 
  return (
    <div>
        <form onSubmit={handleSignup}>
            <h3>Register</h3>
            {error && <p>{error}</p>}
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Signup</button>
        </form>
    </div>
  )
}

export default Signup