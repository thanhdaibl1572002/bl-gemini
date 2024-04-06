'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/sessions.module.sass'
import Button from '../forms/Button'
import { IoAddOutline, IoCloseOutline, IoTrashOutline } from 'react-icons/io5'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import Link from 'next/link'
import { CiChat1, CiChat2 } from 'react-icons/ci'
import { HiOutlineChatBubbleBottomCenterText, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { PiChatsCircleThin } from 'react-icons/pi'

interface ISessionsProps {
    mode?: 'daibl' | 'gemini',
    isShow?: string
}

const faces = ['😊', '❤️', '😄', '🥰', '😁', '😆', '😂', '😃', '😀', '😉', '😋', '😎', '😇', '🤩', '😌']

const Sessions: FC<ISessionsProps> = ({
    mode = 'daibl',
    isShow = '',
}) => {

    const sessionsRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    const [showSessions, setShowSessions] = useState<boolean>(false)

    useEffect(() => {
        if (showSessions && sessionsRef.current && listRef.current) {
            listRef.current.style.left = '0px'
            sessionsRef.current.style.opacity = '1'
            sessionsRef.current.style.visibility = 'visible'
        }
        if (!showSessions && sessionsRef.current && listRef.current) {
            listRef.current.style.left = '-100%'
            sessionsRef.current.style.opacity = '0'
            sessionsRef.current.style.visibility = 'hidden'
        }
    }, [showSessions])

    useEffect(() => {
        if (isShow) setShowSessions(true)
    }, [isShow])

    return (
        <div className={styles[`_container__${mode}`]} ref={sessionsRef}>
            <div className={styles._background} onClick={() => setShowSessions(false)}></div>
            <div className={styles._list} ref={listRef}>
                <Button
                    buttonIcon={<IoAddOutline />}
                    buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonIconSize={22}
                    buttonText={'Tạo cuộc trò chuyện mới'}
                    buttonTextColor={mode === 'daibl' ? daiblColor : geminiColor}
                    buttonTextSize={14.5}
                    buttonWidth={'100%'}
                    buttonHeight={40}
                    buttonBackground={whiteColor}
                    buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
                    buttonBubbleColor={daiblColor}
                />
                <ul>
                    <li>
                        <Link href={'#'}>{faces[0]} Xin chào bạn...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[1]} Làm thế nào để...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[2]} Cách viết code React...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[3]} Công thức nấu ăn...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[4]} Viết bài văn...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[5]} Cách tạo Todo List...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[6]} Giải phương trình...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                    <li>
                        <Link href={'#'}>{faces[7]} Huấn luyện mô hình...</Link>
                        <IoCloseOutline className={styles._delete} title='Xóa' />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sessions