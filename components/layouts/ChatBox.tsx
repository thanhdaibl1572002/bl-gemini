/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, UIEvent, useEffect, useState } from 'react'
import styles from '@/components/layouts/chatbox.module.sass'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setMessages } from '@/redux/slices/generateMessage'
import { getLimitedMessages } from '@/firebase/query'
import GenerateMessage from '@/components/common/GenerateMessage'
import UserMessage from '@/components/common/UserMessage'
import AIMessage from '@/components/common/AIMessage'


interface IChatBoxProps {
  mode: 'daibl' | 'gemini',
  userID: string
}

const ChatBox: FC<IChatBoxProps> = ({
  mode,
  userID,
}) => {

  const { messages } = useAppSelector(state => state.generateMessage)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      const loadedMessages = await getLimitedMessages(mode, userID, 10)
      dispatch(setMessages(loadedMessages))
    })()
  }, [mode, userID])


  return (
    <div className={styles[`_container__${mode}`]}>
      {messages && messages.length > 0 && messages.map((mes, mesIndex) => {
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
      })}
    </div>
  )
}

export default ChatBox