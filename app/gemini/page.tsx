'use client'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { firebaseAuth, firebaseRealtimeDatabase } from '@/firebase'
import { signInAnonymously } from 'firebase/auth'
import { v4 } from 'uuid'
import { push, ref, set } from 'firebase/database'

const Gemini: FC = () => {

    const router = useRouter()

    useEffect(() => {
        (async (): Promise<void> => {
            const sessionID = v4()
            const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
            const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
            const userID = (await signInAnonymously(firebaseAuth)).user.uid
            if (userID) {
                const sessionRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions/${sessionID}`)
                const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${sessionID}`)
                await set(push(sessionRef), { role: 'ai', message: '<h2>Xin chào, tôi là <strong>Gemini</strong>, một mô hình ngôn ngữ được đào tạo bởi Google. Hãy đặt câu hỏi đầu tiên của bạn!</h2>', })
                await set(titleRef, `${randomTitle} Cuộc trò chuyện mới`)
                router.push(`/gemini/${userID}/${sessionID}`)
            }
        })()
    }, [])

    return <></>
}

export default Gemini