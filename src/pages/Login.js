import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    auth,
    signInWithEmailAndPassword,
  } from '../firebase';
  import { login } from '../redux/auth/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
            .then( (userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                }
                ))
            }).catch( (error) => {
                console.log(error);
        
            })}



  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login