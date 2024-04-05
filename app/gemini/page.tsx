'use client'
import { FC, useEffect, useState } from 'react'
import styles from '@/app/gemini/gemini.module.sass'
import Header from '@/components/layouts/Header'
import ChatBox from '@/components/layouts/ChatBox'
import Footer from '@/components/layouts/Footer'
import { firebaseAuth } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'

const Gemini: FC = () => {

  const [userID, setUserID] = useState<string>()

  useEffect(() => {
    const signIn = async (): Promise<void> => {
      const userID = localStorage.getItem(process.env.ANONYMOUSLY_USER_LOCAL_STORAGE_KEY as string)
      if (userID) {
        setUserID(userID)
        return
      } else {
        const userID = (await signInAnonymously(firebaseAuth)).user.uid
        if (userID) {
          localStorage.setItem(process.env.ANONYMOUSLY_USER_LOCAL_STORAGE_KEY as string, userID)
          setUserID(userID)
        }
      }
    }
    signIn()
  }, [])

  return (
    <div className={styles._container__gemini}>
      {userID && (
        <>
          <Header mode={'gemini'} />
          <ChatBox mode={'gemini'} userID={userID} />
          <Footer mode={'gemini'} userID={userID} />
        </>
      )}
    </div>
  )
}

export default Gemini