/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react'
import styles from '@/components/layouts/footer.module.sass'
import { daiblGradientColor, geminiGradientColor, whiteColor } from '@/variables/variables'
import { useAppSelector } from '@/redux'
import { useAppDispatch } from '@/redux'
import Button from '@/components/forms/Button'
import { VscSend } from 'react-icons/vsc'
import { addNewMessage, setDisplayText, setIsComplete, setIsGenerating, setMessageStatus } from '@/redux/slices/generateMessage'
import { push, ref, set } from 'firebase/database'
import { firebaseRealtimeDatabase } from '@/firebase'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { convertMessagesToHistories } from '@/firebase/query'

interface IFooterProps {
  mode?: 'daibl' | 'gemini',
  userID: string
}

const genAI = new GoogleGenerativeAI(process.env.geminiApiKey as string)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const Footer: FC<IFooterProps> = ({
  mode = 'daibl',
  userID,
}) => {

  const { isGenerating, isComplete, displayText, messages } = useAppSelector(state => state.generateMessage)
  const [text, setText] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    setText('')
    let isRunning: boolean = true
    const messageRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}`)

    if (mode === 'daibl') {
      console.log('DAIBL Generating')
      dispatch(setIsGenerating(false))
    } else if (mode === 'gemini') {
      (async () => {
        if (isGenerating && text.trim()) {
          dispatch(addNewMessage({ role: 'user', message: text }))
          dispatch(addNewMessage({ role: 'ai', message: '' }))
          await set(push(messageRef), { role: 'user', message: text })

          const { userHistories, aiHistories } = convertMessagesToHistories(messages)
          // console.log(userHistories, aiHistories)

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
            const resultInterval = setInterval(() => {
              dispatch(setDisplayText(resultText.slice(0, charIndex)))
              charIndex++
              chunkText = ''
              if (charIndex >= resultText.length || !isRunning) {
                clearInterval(resultInterval)
                dispatch(setIsGenerating(false))
                dispatch(setIsComplete(true))
                return
              }
            }, 30)
          }
        }
      })()
    }

    return () => {
      isRunning = false
    }
  }, [isGenerating])

  useEffect(() => {
    if (mode === 'daibl') {

    } else if (mode === 'gemini'){
      (async () => {
        if (isComplete && displayText.trim() && !isGenerating) {
          dispatch(setMessageStatus({ role: 'ai', message: displayText }))
          const messageRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}`)
          await set(push(messageRef), { role: 'ai', message: displayText })
          dispatch(setDisplayText(''))
          dispatch(setIsComplete(false))
        }
      })()
    }
  }, [isComplete, isGenerating])

  const handleSend = (): void => { dispatch(setIsGenerating(true)) }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setText(event.target.value)

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      text.trim() && handleSend()
    }
  }

  return (
    <div className={styles[`_container__${mode}`]}>
      <textarea
        placeholder={mode === 'daibl' ? 'Phân loại bình luận với DAIBL' : 'Trò chuyện với Gemini AI'}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={text}
      >
      </textarea>
      <Button
        buttonClassName={styles._send}
        buttonIcon={<VscSend />}
        buttonIconColor={whiteColor}
        buttonIconSize={25}
        buttonWidth={40}
        buttonHeight={40}
        buttonBackground={mode === 'daibl' ? daiblGradientColor : geminiGradientColor}
        disabled={isGenerating || !text.trim()}
        onClick={handleSend}
      />
    </div>
  )
}

export default Footer