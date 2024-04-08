'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/sessions.module.sass'
import Button from '@/components/forms/Button'
import { blackColor, daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { useAppDispatch, useAppSelector } from '@/redux'
import { addSessionTitle, setIsShowing, setSessionTitles } from '@/redux/slices/sessionSlice'
import { getLimitedSessionTitles } from '@/firebase/query'
import { IoAddOutline } from 'react-icons/io5'
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

    const [db, setDb] = useState<IDBDatabase | null>(null)

    const indexDBName = process.env.indexedDBName as string
    const storeName = process.env.indexedDBStoreName as string  

    const sessionRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sessionRef.current && listRef.current && backgroundRef.current) {
            if (isShowing) {
                sessionRef.current.style.opacity = '1'
                sessionRef.current.style.visibility = 'visible'
                listRef.current.style.left = '0'
                backgroundRef.current.style.background = getColorLevel(blackColor, 10)
            } else {
                sessionRef.current.style.opacity = '0'
                sessionRef.current.style.visibility = 'hidden'
                listRef.current.style.left = '-250px'
            }
        }
    }, [isShowing])

    
    useEffect(() => {
        dispatch(setIsShowing(false));
        const request = indexedDB.open(indexDBName)
        request.onupgradeneeded = () => {
          const db = request.result
          db.createObjectStore(storeName)
        }
        request.onsuccess = () => {
          setDb(request.result)
          const transaction = request.result.transaction(storeName, 'readonly')
          const store = transaction.objectStore(storeName)
          const getRequest = store.get(`${mode}/${userID}`)
          getRequest.onsuccess = async () => {
            const cachingTitles = getRequest.result
            if (cachingTitles && cachingTitles.length > 0) {
                dispatch(setSessionTitles(cachingTitles))
            } else {
                const limitTitles = await getLimitedSessionTitles(mode, userID, 10)
                dispatch(setSessionTitles(limitTitles))
            }
          }
          getRequest.onerror = () => console.log(getRequest.error)
        }
        request.onerror = () => console.error('Error', request.error)
      }, [])

      useEffect(() => {
        if (!db) return
        const transaction = db.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
        store.put(sessionTitles.slice(-10), `${mode}/${userID}`)
      }, [sessionTitles])
    
    //   useEffect(() => {
    //     if (!db) return
    //     const transaction = db.transaction(storeName, 'readwrite')
    //     const store = transaction.objectStore(storeName)
    //     store.put(messages, `${mode}/${userID}/${sessionID}`)
    //   }, [messages])

    // useEffect(() => {
    //     (async (): Promise<void> => {
            // const limitTitles = await getLimitedSessionTitles(mode, userID, 10)
            // dispatch(setSessionTitles(limitTitles))
    //     })()
    // }, [])

    const handleAddSession = async (): Promise<void> => {
        if (sessionTitles.length < 10) {
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
            const newTitle = `${randomTitle} Cuộc trò chuyện mới`
            await set(titleRef, newTitle)

            dispatch(addSessionTitle({ sessionID: newSessionID!, title: newTitle }))

            router.push(`/${mode}/${userID}/${newSessionID}`)
        }
    }

    return (
        <div className={styles[`_container__${mode}`]} ref={sessionRef}>
            <div
                className={styles._background}
                ref={backgroundRef}
                onClick={() => dispatch(setIsShowing(false))}
            ></div>
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
                    disabled={sessionTitles.length >= 10}
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