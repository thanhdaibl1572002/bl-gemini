'use client'
import { firebaseAuth, firebaseRealtimeDatabase } from '@/firebase'
import { getLatestSessionID } from '@/firebase/query'
import { signInAnonymously } from 'firebase/auth'
import { push, ref, set } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const Gemini: FC = () => {

    const router = useRouter()

    useEffect(() => {
        (async (): Promise<void> => {
            const userID = (await signInAnonymously(firebaseAuth)).user.uid
            if (userID) {
                const lastSessionID = await getLatestSessionID('gemini', userID)
                if (lastSessionID) {
                    router.push(`/gemini/${userID}/${lastSessionID}`)
                } else {
                    const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
                    const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
                    const sessionsRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions`)
    
                    const newSessionRef = push(push(sessionsRef))
                    const newSessionID = newSessionRef.parent?.key
                    await set(newSessionRef, {
                        role: 'ai',
                        message: '<h2>Xin chào, tôi là <strong>Gemini</strong>',
                    })
                    const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${newSessionID}`)
                    await set(titleRef, `${randomTitle} Cuộc trò chuyện mới`)
    
                    router.push(`/gemini/${userID}/${newSessionID}`)
                }
            }
        })()
    }, [])

    return <></>
}

export default Gemini