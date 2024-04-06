'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/session-titles.module.sass'
import Button from '@/components/forms/Button'
import { IoAddOutline } from 'react-icons/io5'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { useRouter } from 'next/navigation'
import { push, ref, set } from 'firebase/database'
import { firebaseRealtimeDatabase } from '@/firebase'
import { v4 } from 'uuid'
import { getLimitedSessionTitles } from '@/firebase/query'
import SessionTitleItem from '@/components/layouts/SessionTitleItem'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setSessionTitles } from '@/redux/slices/sessionTitle'

interface ISessionTitlesProps {
    mode?: 'daibl' | 'gemini',
    isShow?: string
    userID: string
    sessionID: string
}

const SessionTitles: FC<ISessionTitlesProps> = ({
    mode = 'daibl',
    isShow = '',
    userID,
    sessionID,
}) => {

    const sessionsTitleRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const dispatch = useAppDispatch()

    const { sessionTitles } = useAppSelector(state => state.sessionTitles)

    const [showSessionTitles, setShowSessionTitles] = useState<boolean>(false)

    useEffect(() => {
        if (showSessionTitles && sessionsTitleRef.current && listRef.current) {
            listRef.current.style.left = '0px'
            sessionsTitleRef.current.style.opacity = '1'
            sessionsTitleRef.current.style.visibility = 'visible'
        }
        if (!showSessionTitles && sessionsTitleRef.current && listRef.current) {
            listRef.current.style.left = '-250px'
            sessionsTitleRef.current.style.opacity = '0'
            sessionsTitleRef.current.style.visibility = 'hidden'
        }
    }, [showSessionTitles])

    useEffect(() => {
        if (isShow) setShowSessionTitles(true)
    }, [isShow])

    useEffect(() => {
        (async () => {
            const limitSessions = await getLimitedSessionTitles(mode, userID, 10)
            dispatch(setSessionTitles(limitSessions))
            console.log('Getting sessions')
        })()
    }, [])

    console.log('Session titles re-render', sessionTitles)

    const handleCreateSession = async (): Promise<void> => {
        const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
        const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
        const sessionID = v4()
        const sessionRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions/${sessionID}`)
        const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${sessionID}`)
        await set(push(sessionRef), { role: 'ai', message: '<h2>Xin chào, tôi là <strong>Gemini</strong>, một mô hình ngôn ngữ được đào tạo bởi Google. Hãy đặt câu hỏi đầu tiên của bạn!</h2>', })
        await set(titleRef, `${randomTitle} Cuộc trò chuyện mới`)
        router.push(`/gemini/${userID}/${sessionID}`)
    }

    return (
        <div className={styles[`_container__${mode}`]} ref={sessionsTitleRef}>
            <div className={styles._background} onClick={() => setShowSessionTitles(false)}></div>
            <div className={styles._list} ref={listRef}>
                <Button
                    buttonIcon={<IoAddOutline />}
                    buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonIconSize={22}
                    buttonText={'Tạo Cuộc Trò Chuyện Mới'}
                    buttonTextColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonTextSize={14.5}
                    buttonWidth={'100%'}
                    buttonHeight={40}
                    buttonBackground={whiteColor}
                    buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
                    buttonBubbleColor={daiblColor}
                    onClick={handleCreateSession}
                />
                <ul>
                    {sessionTitles && sessionTitles.length > 0 && sessionTitles.map((sessionTitle, sessionTitleIndex) => (
                        <SessionTitleItem 
                            key={sessionTitleIndex} 
                            mode={mode}
                            userID={userID}
                            sessionID={sessionTitle.sessionID!}
                            sessiontitle={sessionTitle.title}
                            currentSessionID={sessionID}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SessionTitles