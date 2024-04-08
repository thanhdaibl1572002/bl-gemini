/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from '@/components/layouts/chatbox.module.sass'
import { useAppDispatch, useAppSelector } from '@/redux'
import { setMessages } from '@/redux/slices/messageSlice'
import { getLimitedMessages, getLimitedMoreMessages } from '@/firebase/query'
import GenerateMessage from '@/components/common/GenerateMessage'
import UserMessage from '@/components/common/UserMessage'
import AIMessage from '@/components/common/AIMessage'
import { setIsShowing } from '@/redux/slices/sessionSlice'
import LoadMore from '@/components/common/LoadMore'
import Button from '@/components/forms/Button'
import ChatBoxLoading from '@/components/common/ChatBoxLoading'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { RxDoubleArrowDown } from 'react-icons/rx'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const scrollEndRef = useRef<HTMLDivElement>(null)

  const indexDBName = process.env.indexedDBName as string
  const storeName = process.env.indexedDBStoreName as string

  const [db, setDb] = useState<IDBDatabase | null>(null)

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
      const getRequest = store.get(`${mode}/${userID}/${sessionID}`)
      getRequest.onsuccess = async () => {
        const cachingMessages = getRequest.result
        if (cachingMessages && cachingMessages.length > 0) {
          dispatch(setMessages(cachingMessages))
        } else {
          const limitMessages = await getLimitedMessages(mode, userID, sessionID, 10)
          dispatch(setMessages(limitMessages))
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
    store.put(messages.slice(-10), `${mode}/${userID}/${sessionID}`)
  }, [messages])

  const [isLoadMore, setIsLoadMore] = useState<boolean>(false)

  useEffect(() => {
    const chatBox = chatBoxRef.current
    if (!chatBox) return

    const handleScroll = async () => {
      if (isLoadMore || !chatBoxRef.current) return
      const chatBox = chatBoxRef.current
      const isScrolledToTop = chatBox.scrollTop === 0

      if (isScrolledToTop) {
        setIsLoadMore(true)
        const moreMessages = await getLimitedMoreMessages(mode, userID, sessionID, messages[0].key!)
        if (moreMessages.length === 0) {
          setIsLoadMore(false)
          return
        }
        dispatch(setMessages([...moreMessages, ...messages]))
        setIsLoadMore(false)
        const currentScrollTop = chatBox.scrollTop
        const currentScrollHeight = chatBox.scrollHeight
        requestAnimationFrame(() => {
          const newScrollTop = currentScrollTop + (chatBox.scrollHeight - currentScrollHeight)
          chatBox.scrollTop = newScrollTop
        })
      }

      if (scrollEndRef.current) {
        chatBox.scrollTop < chatBox.scrollHeight - chatBox.clientHeight - 10
          ? scrollEndRef.current.style.display = 'flex'
          : scrollEndRef.current.style.display = 'none'
      }
    }

    chatBox.addEventListener('scroll', handleScroll)

    return () => chatBox.removeEventListener('scroll', handleScroll)
  }, [chatBoxRef.current, messages.length])

  const handleScrollEnd = (): void => {
    const chatBox = chatBoxRef.current
    if (chatBox)
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight
  }

  return (
    <div className={styles[`_container__${mode}`]} ref={chatBoxRef}>
      <div className={styles._scroll__end} ref={scrollEndRef}>
        <Button
          buttonClassName={styles._show}
          buttonIcon={useMemo(() => <RxDoubleArrowDown />, [])}
          buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
          buttonIconSize={20}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorderRadius={'50%'}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
          buttonBubbleColor={daiblColor}
          onClick={handleScrollEnd}
        />
      </div>
      {isLoadMore && <LoadMore mode={mode} />}
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
        <ChatBoxLoading mode={mode} />
      )}
    </div>
  )
}

export default ChatBox