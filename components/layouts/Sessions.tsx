'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/sessions.module.sass'
import Button from '../forms/Button'
import { CiBoxList, CiEdit } from 'react-icons/ci'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setIsShowing, setSessionTitles } from '@/redux/slices/sessionSlice'
import { getLimitedSessionTitles } from '@/firebase/query'
import { IoAddOutline, IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import Link from 'next/link'
import SessionItem from './SessionItem'
import { firebaseRealtimeDatabase } from '@/firebase'
import { push, ref, set } from 'firebase/database'
import { useRouter } from 'next/navigation'

interface ISessionProps {
    mode?: 'daibl' | 'gemini'
    userID: string
    sessionID: string
}

const Sessions: FC<ISessionProps> = ({
    mode = 'daibl',
    userID,
    sessionID,
}) => {

    const dispatch = useAppDispatch()

    const router = useRouter()

    const { isShowing, sessionTitles } = useAppSelector(state => state.session)

    const sessionRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sessionRef.current && listRef.current) {
            if (isShowing) {
                sessionRef.current.style.opacity = '1'
                sessionRef.current.style.visibility = 'visible'
                listRef.current.style.left = '0'
            } else {
                sessionRef.current.style.opacity = '0'
                sessionRef.current.style.visibility = 'hidden'
                listRef.current.style.left = '-250px'
            }
        }
    }, [isShowing])

    useEffect(() => {
        (async (): Promise<void> => {
            const limitTitles = await getLimitedSessionTitles(mode, userID, 10)
            dispatch(setSessionTitles(limitTitles))
        })()
    }, [])

    const handleAddSession = async (): Promise<void> => {
        const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
        const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
        const sessionsRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/sessions`)
                        
        const newSessionRef = push(push(sessionsRef))
        const newSessionID = newSessionRef.parent?.key
        await set(newSessionRef, {
            role: 'ai',
            message: mode === 'daibl' ? '<h2>Xin chào, tôi là <strong>DAIBL</strong>, tôi có thể giúp dự đoán cảm xúc <strong>tích cực</strong>, <strong>tiêu cực</strong> hoặc <strong>trung lập</strong> của bình luận.' : '<h2>Xin chào, tôi là <strong>Gemini</strong>.',
        })
        const titleRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/titles/${newSessionID}`)
        await set(titleRef,`${randomTitle} Cuộc trò chuyện mới`)

        router.push(`/${mode}/${userID}/${newSessionID}`)
    }

    return (
        <div className={styles[`_container__${mode}`]} ref={sessionRef}>
            <div className={styles._background} onClick={() => dispatch(setIsShowing(false))}></div>
            <div className={styles._list} ref={listRef}>
                <Button
                    buttonIcon={<IoAddOutline />}
                    buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonIconSize={22}
                    buttonText={'Cuộc Trò Chuyện Mới'}
                    buttonTextColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonTextSize={14.5}
                    buttonWidth={'100%'}
                    buttonHeight={40}
                    buttonBackground={whiteColor}
                    buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
                    buttonBubbleColor={daiblColor}
                    onClick={handleAddSession}
                />
                <ul>
                    {sessionTitles && sessionTitles.length > 0 && sessionTitles.map((sessionTitle, sessionTitleIndex) => (
                        <SessionItem 
                            key={sessionTitleIndex}
                            mode={mode}
                            userID={userID}
                            sessionTitle={sessionTitle.title}
                            sessionID={sessionTitle.sessionID}
                            currentSessionID={sessionID}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sessions