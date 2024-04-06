/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useEffect } from 'react'
import styles from '@/components/layouts/chatbox.module.sass'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setMessages } from '@/redux/slices/generateMessage'
import { getLimitedMessages } from '@/firebase/query'
import GenerateMessage from '@/components/common/GenerateMessage'
import UserMessage from '@/components/common/UserMessage'
import AIMessage from '@/components/common/AIMessage'

interface IChatBoxProps {
  mode: 'daibl' | 'gemini'
  userID: string
  sessionID: string
}

const ChatBox: FC<IChatBoxProps> = ({
  mode,
  userID,
  sessionID,
}) => {

  const { messages } = useAppSelector(state => state.generateMessage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      const limitMessages = await getLimitedMessages(mode, userID, sessionID, 10)
      dispatch(setMessages(limitMessages))
      console.log('Getting messages')
    })()
  }, [mode, userID, sessionID])


  return (
    <div className={styles[`_container__${mode}`]}>
      {messages && messages.length > 0 ? messages.map((mes, mesIndex) => {
        switch (mes.role) {
          case 'ai':
            if (mes.message) {
              return <AIMessage key={mesIndex} mode={mode} text={mes.message} />
            } else {
              return <GenerateMessage key={mesIndex} mode={mode} />
            }
          case 'user':
            return <UserMessage key={mesIndex} mode={mode} text={mes.message} />
          default:
            return null
        }
      }) : (
        <div className={styles._deleted}>
          Bạn đã xóa cuộc trò chuyện này
        </div>
      )}
    </div>
  )
}

export default ChatBox