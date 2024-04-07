import { FC, memo, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/session-item.module.sass'
import Link from 'next/link'
import { CiEdit } from 'react-icons/ci'
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import { ref, remove, set } from 'firebase/database'
import { firebaseRealtimeDatabase } from '@/firebase'
import { useAppDispatch } from '@/redux'
import { useRouter } from 'next/navigation'
import { deleteSessionTitle, updateSessionTitle } from '@/redux/slices/sessionSlice'
import { setMessages } from '@/redux/slices/messageSlice'
import { getLimitedMessages } from '@/firebase/query'

interface ISessionTitleItemProps {
    mode?: 'daibl' | 'gemini',
    userID: string
    sessiontitle: string
    sessionID: string
    currentSessionID: string
}

const SessionTitleItem: FC<ISessionTitleItemProps> = ({
    mode = 'daibl',
    userID,
    sessiontitle,
    sessionID,
    currentSessionID,
}) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editValue, setEditValue] = useState<string>(sessiontitle)

    const sessionItemRef = useRef<HTMLLIElement>(null)

    const dispatch = useAppDispatch()

    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sessionItemRef.current && !sessionItemRef.current.contains(event.target as Node)) {
                setIsEdit(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleEditSession = async (): Promise<void> => {
        if (editValue.trim()) {
            try {
                const titleRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/titles/${sessionID}/title`)
                await set(titleRef, editValue)
                dispatch(updateSessionTitle({ sessionID: sessionID, title: editValue }))
                setIsEdit(false)
            } catch (error) {
                throw error
            }
        }
    }

    const handleDeleteSession = async (): Promise<void> => {
        try {
            const titleRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/titles/${sessionID}`)
            const sessionRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/sessions/${sessionID}`)
            await remove(titleRef)
            await remove(sessionRef)
            dispatch(deleteSessionTitle(sessionID))
            if (currentSessionID === sessionID) {
                const limitMessages = await getLimitedMessages(mode, userID, sessionID, 10)
                dispatch(setMessages(limitMessages))
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <li 
            className={sessionID === currentSessionID ? styles[`_container__${mode}__active`] : styles[`_container__${mode}`]} 
            ref={sessionItemRef} 
        >
            {isEdit ? (
                <input
                    type='text'
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleEditSession()}
                />
            ) : (
                <Link href={`/${mode}/${userID}/${sessionID}`}>
                    {sessiontitle.length > 22 ? `${sessiontitle.slice(0, 22)}...` : sessiontitle }
                </Link>
            )}
            <div className={styles._actions}>
                {!isEdit && <CiEdit className={styles._edit} onClick={() => setIsEdit(true)} />}
                {!isEdit && <IoCloseOutline className={styles._delete} onClick={handleDeleteSession}/>}
                {isEdit && <IoCheckmark className={styles._complete} onClick={handleEditSession}/>}
            </div>
        </li>
    )
}

export default memo(SessionTitleItem)