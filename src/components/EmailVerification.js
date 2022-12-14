import React from 'react'
import { auth } from '../firebase'
import styles from '../styles/EmailVerification.module.css'

const EmailVerification = () => {
    const user = auth.currentUser;

  return (
    <div className={styles.email_card}>
            <h1 className={styles.title}>Email Verification</h1>
          <div className={styles.content}>
            <p>We have sent a verification email to</p><a href='/'>{user.email}</a> 
        </div>
        <p> Please check your inbox and click the link to activate your account.</p>
    </div>
  )
}

export default EmailVerification