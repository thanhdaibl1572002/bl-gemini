/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react'
import styles from '@/components/layouts/footer.module.sass'
import { daiblGradientColor, geminiGradientColor, whiteColor } from '@/variables/variables'
import { useAppSelector } from '@/redux'
import { useAppDispatch } from '@/redux'
import Button from '@/components/forms/Button'
import { addNewMessage, setDisplayText, setIsComplete, setIsGenerating, setMessageStatus } from '@/redux/slices/messageSlice'
import { push, ref, set } from 'firebase/database'
import { firebaseRealtimeDatabase } from '@/firebase'
import { CiPaperplane } from 'react-icons/ci'
import { daiblResponseText, convertMessagesToHistories, model } from '@/utils'
import axios from 'axios'

interface IFooterProps {
  mode?: 'daibl' | 'gemini'
  userID: string
  sessionID: string
}

const Footer: FC<IFooterProps> = ({
  mode = 'daibl',
  userID,
  sessionID,
}) => {

  const { isGenerating, isComplete, displayText, messages } = useAppSelector(state => state.message)
  const [text, setText] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    let intervalCount: number = 0
    if (isGenerating && mode === 'daibl' && text.trim()) {
      const messageRef = ref(firebaseRealtimeDatabase, `daibl/${userID}/sessions/${sessionID}`)
      setText('');
      (async (): Promise<void> => {
        dispatch(addNewMessage({ role: 'user', message: text }))
        await set(push(messageRef), { role: 'user', message: text })
        dispatch(addNewMessage({ role: 'ai', message: '' }))
        const response = await axios.post(process.env.daiblServerUrl as string, { comment: text })
        const responseData = response.data.toString()
        const responseText = daiblResponseText(responseData, text)
        let charIndex = 0
        const intervalId = setInterval(() => {
          charIndex++
          dispatch(setDisplayText(responseText.slice(0, charIndex)))
          if (charIndex >= responseText.length) {
            clearInterval(intervalId)
            intervalCount--
            if (intervalCount === 0) {
              dispatch(setIsGenerating(false))
              dispatch(setIsComplete(true))
            }
          }
        }, 0)
        intervalCount++
      })()
    }
  }, [isGenerating, mode])

  useEffect(() => {
    let isRunning: boolean = true
    let intervalCount: number = 0
    if (isGenerating && mode === 'gemini' && text.trim()) {
      const messageRef = ref(firebaseRealtimeDatabase, `gemini/${userID}/sessions/${sessionID}`)
      setText('');
      (async (): Promise<void> => {
        if (!isRunning) return
        dispatch(addNewMessage({ role: 'user', message: text }))
        await set(push(messageRef), { role: 'user', message: text })
        dispatch(addNewMessage({ role: 'ai', message: '' }))
        const { userHistories, aiHistories } = convertMessagesToHistories(messages)
        const chat = model.startChat({
          history: [
            { role: 'user', parts: userHistories && userHistories.length > 0 ? userHistories : [{ text: 'Xin chào' }] },
            { role: 'model', parts: aiHistories && aiHistories.length > 0 ? aiHistories : [{ text: 'Xin chào' }] },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
          },
        })
        const result = chat.sendMessageStream(text)
        let resultText = ''
        let charIndex = 0
        for await (const chunk of (await result).stream) {
          if (!isRunning) break
          let chunkText = chunk.text()
          resultText += chunkText
          const intervalId = setInterval(() => {
            charIndex++
            chunkText = ''
            dispatch(setDisplayText(resultText.slice(0, charIndex)))
            if (charIndex >= resultText.length || !isRunning) {
              clearInterval(intervalId)
              intervalCount--
              if (intervalCount === 0) {
                dispatch(setIsGenerating(false))
                dispatch(setIsComplete(true))
              }
            }
          }, 30)
          intervalCount++
        }
      })()
    }
    return () => {
      isRunning = false
    }
  }, [isGenerating])

  console.log('isComplete: ', isComplete, ' | isGenerating: ', isGenerating, ' | displayText: ', displayText)

  useEffect(() => {
    if (isComplete && !isGenerating && displayText.trim()) {
      dispatch(setDisplayText(''))
      dispatch(setIsComplete(false))
      dispatch(setIsGenerating(false));
      (async (): Promise<void> => {
        dispatch(setMessageStatus({ role: 'ai', message: displayText }))
        const messageRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/sessions/${sessionID}`)
        await set(push(messageRef), { role: 'ai', message: displayText })
        return
      })()
    }
  }, [isComplete, isGenerating, displayText])


  const handleSend = (): void => {
    dispatch(setIsGenerating(true))
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setText(event.target.value)

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      text.trim() && handleSend()
    }
  }

  return (
    <div className={styles[`_container__${mode}`]}>
      {messages && messages.length > 0 && (
        <>
          <textarea
            placeholder={mode === 'daibl' ? 'Phân loại bình luận với DAIBL' : 'Trò chuyện với Gemini AI'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={text}
          >
          </textarea>
          <Button
            buttonClassName={styles._send}
            buttonIcon={<CiPaperplane />}
            buttonIconColor={whiteColor}
            buttonIconSize={28}
            buttonWidth={40}
            buttonHeight={40}
            buttonBackground={mode === 'daibl' ? daiblGradientColor : geminiGradientColor}
            disabled={isGenerating || !text.trim()}
            onClick={handleSend}
          />
        </>
      )}
    </div>
  )
}

export default Footer