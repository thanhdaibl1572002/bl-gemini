import { FC, memo, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/session-title-item.module.sass'
import Link from 'next/link'
import { CiEdit } from 'react-icons/ci'
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5'
import { ref, remove, set } from 'firebase/database'
import { firebaseRealtimeDatabase } from '@/firebase'
import { useAppDispatch, useAppSelector } from '@/redux'
import { deleteSessionTitle, editSessionTitle } from '@/redux/slices/sessionTitle'
import { useRouter } from 'next/navigation'
import { getLimitedMessages } from '@/firebase/query'
import { setMessages } from '@/redux/slices/generateMessage'
import { blackColor, daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'

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

    const { sessionTitles } = useAppSelector(state => state.sessionTitles)

    const router = useRouter()

    const handleComplete = async (): Promise<void> => {
        if (editValue.trim()) {
            try {
                const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${sessionID}`)
                await set(titleRef, editValue)
                dispatch(editSessionTitle({ sessionID: sessionID, newTitle: editValue }))
                setIsEdit(false)
            } catch (error) {
                throw error
            }
        }
    }

    const handleDelete = async (): Promise<void> => {
        try {
            const titleRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/titles/${sessionID}`)
            const sessionRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions/${sessionID}`)
            await remove(titleRef)
            await remove(sessionRef)
            dispatch(deleteSessionTitle(sessionID))
            const limitMessages = await getLimitedMessages(mode, userID, currentSessionID, 10)
            dispatch(setMessages(limitMessages))
        } catch (error) {
            throw error
        }
    }

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

    return (
        <li 
            className={styles[`_container__${mode}`]} 
            ref={sessionItemRef} 
            style={{ 
                background: sessionID === currentSessionID 
                ? getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 5) 
                : whiteColor, 
                color: sessionID === currentSessionID 
                ? mode === 'daibl' ? daiblColor : geminiColor
                : blackColor
            }}
        >
            {isEdit ? (
                <input
                    type='text'
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleComplete()}
                />
            ) : (
                <Link href={`/${mode}/${userID}/${sessionID}`}>{sessiontitle}</Link>
            )}
            <div className={styles._actions}>
                {!isEdit && <CiEdit className={styles._edit} title='Sửa' onClick={() => setIsEdit(true)} />}
                {!isEdit && <IoCloseOutline className={styles._delete} title='Xóa' onClick={handleDelete} />}
                {isEdit && <IoCheckmark className={styles._complete} title='Xong' onClick={handleComplete} />}
            </div>
        </li>
    )
}

export default memo(SessionTitleItem)