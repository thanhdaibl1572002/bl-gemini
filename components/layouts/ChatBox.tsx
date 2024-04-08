/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/layouts/chatbox.module.sass'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setMessages } from '@/redux/slices/messageSlice'
import { getLimitedMessages } from '@/firebase/query'
import GenerateMessage from '@/components/common/GenerateMessage'
import UserMessage from '@/components/common/UserMessage'
import AIMessage from '@/components/common/AIMessage'
import { setIsShowing } from '@/redux/slices/sessionSlice'

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

  const { messages } = useAppSelector(state => state.message)
  const dispatch = useAppDispatch()
  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(setIsShowing(false));
    (async () => {
      const limitMessages = await getLimitedMessages(mode, userID, sessionID, 10)
      dispatch(setMessages(limitMessages))
    })()
  }, [])

  // const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

  // const handleScroll = async () => {
  //   if (isLoadingMore || !chatBoxRef.current) return
  //   const chatBox = chatBoxRef.current
  //   const isScrolledToTop = chatBox.scrollTop === 0

  //   if (isScrolledToTop) {
  //     setIsLoadingMore(true)
  //     const nextMessageNumbers = messages.length + 10
  //     const nextMessages = await getLimitedMessages(mode, userID, sessionID, nextMessageNumbers)
  //     dispatch(setMessages(nextMessages))
  //     setIsLoadingMore(false)
  //     requestAnimationFrame(() => {
  //       chatBox.scrollTo({ top: 0 })
  //     })
  //   }
  // }

  // useEffect(() => {
  //   const chatBox = chatBoxRef.current
  //   if (!chatBox) return

  //   chatBox.addEventListener('scroll', handleScroll)

  //   return () => chatBox.removeEventListener('scroll', handleScroll)
  // }, [chatBoxRef.current, messages.length])

  // console.log(messages)

  return (
    <div className={styles[`_container__${mode}`]} ref={chatBoxRef}>
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