'use client'
import { FC, useEffect, useState } from 'react'
import styles from '@/app/page.module.sass'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import ChatBox from '@/components/layouts/ChatBox'
import { firebaseRealtimeDatabase, firebaseAuth } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'
import { IMessage } from '@/interfaces/message'


const Home: FC = () => {

  const [messages, setMessage] = useState<Array<IMessage>>([])

  return (
    <div className={styles._container__daibl}>
      {/* <Header mode={'daibl'} />
      <ChatBox mode={'daibl'} messages={messages} />
      <Footer mode={'daibl'} /> */}
    </div>
  )
}

export default Home

