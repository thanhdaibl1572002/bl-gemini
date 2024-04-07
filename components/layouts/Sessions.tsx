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
import { v4 } from 'uuid'
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
            console.log(limitTitles)
        })()
    }, [])

    const handleAddSession = async (): Promise<void> => {
        const sessionID = v4()
        const initTitles = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩']
        const randomTitle = initTitles[Math.floor(Math.random() * initTitles.length)]
        const sessionRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions/${sessionID}`)
        const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${sessionID}`)
        await set(push(sessionRef), { 
            role: 'ai', 
            message: mode === 'daibl' ? '<h2>Xin chào, tôi là <strong>DAIBL</strong>, một mô hình máy học được huyến luyện với mục đích giúp phân loại bình luận theo cảm xúc. Hãy nhập vào bình luận đầu tiên của bạn, tôi sẽ giúp bạn phân loại nó là bình luận <strong>tích cực</strong>, <strong>tiêu cực</strong> hay <strong>trung lập</strong>.</h2>' : '<h2>Xin chào, tôi là <strong>Gemini</strong>, một mô hình ngôn ngữ được đào tạo bởi Google. Hãy đặt câu hỏi đầu tiên của bạn!</h2>', 
        })
        await set(titleRef, { timestamp: new Date().getTime(), title: `${randomTitle} Cuộc trò chuyện mới` })
        router.push(`/${mode}/${userID}/${sessionID}`)
    
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
                    {sessionTitles && sessionTitles.length > 0 && sessionTitles.map((title, titleIndex) => (
                        <SessionItem 
                            key={titleIndex}
                            mode={mode}
                            userID={userID}
                            sessiontitle={title.title.title}
                            sessionID={title.sessionID}
                            currentSessionID={sessionID}
                        />
                    ))}
                </ul>
                
            </div>
        </div>
    )
}

export default Sessions