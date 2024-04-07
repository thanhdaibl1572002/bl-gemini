'use client'
import { FC, useEffect } from 'react'
import { firebaseRealtimeDatabase, firebaseAuth } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { push, ref, set } from 'firebase/database'
import { getLatestSessionID } from '@/firebase/query'

const Home: FC = () => {

    const router = useRouter()

    useEffect(() => {
        (async (): Promise<void> => {
            const userID = (await signInAnonymously(firebaseAuth)).user.uid
            if (userID) {
                const lastSessionID = await getLatestSessionID('daibl', userID)
                if (lastSessionID) {
                    router.push(`/daibl/${userID}/${lastSessionID}`)
                } else {
                    const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
                    const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
                    const sessionsRef = ref(firebaseRealtimeDatabase, `daibl/${userID}/sessions`)

                    const newSessionRef = push(push(sessionsRef))
                    const newSessionID = newSessionRef.parent?.key
                    await set(newSessionRef, {
                        role: 'ai',
                        message: '<h2>Xin chào, tôi là <strong>DAIBL</strong>, tôi có thể giúp dự đoán cảm xúc <strong>tích cực</strong>, <strong>tiêu cực</strong> hoặc <strong>trung lập</strong> của bình luận.',
                    })
                    const titleRef = ref(firebaseRealtimeDatabase, `daibl/${userID}/titles/${newSessionID}`)
                    await set(titleRef, `${randomTitle} Cuộc trò chuyện mới`)

                    router.push(`daibl/${userID}/${newSessionID}`)
                }
            }
        })()
    }, [])

    return <></>
}

export default Home

