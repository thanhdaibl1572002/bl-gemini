'use client'
import { FC, memo, useEffect, useRef } from 'react'
import styles from '@/components/common/user-message.module.sass'

interface IUserMessageProps {
  mode?: 'daibl' | 'gemini'
  text: string
}

const UserMessage: FC<IUserMessageProps> = ({
  mode = 'daibl',
  text = '',
}) => {

  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageRef.current)
      messageRef.current.parentElement!.scrollTop = messageRef.current.parentElement!.scrollHeight
  }, [])

  return (
    <div className={styles[`_container__${mode}`]} ref={messageRef}>
        <div className={styles._content}>{text}</div>
    </div>
  )
}

export default memo(UserMessage)