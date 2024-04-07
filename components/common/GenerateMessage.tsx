'use client'
import { FC, memo, useEffect, useRef } from 'react'
import styles from '@/components/common/generate-message.module.sass'
import { daiblColor, geminiColor, getColorLevel, redColor, whiteColor } from '@/variables/variables'
import MarkDown from '@/components/common/MarkDown'
import Button from '@/components/forms/Button'
import { useAppDispatch, useAppSelector } from '@/redux'
import MessageTitle from '@/components/common/MessageTitle'
import { setIsGenerating } from '@/redux/slices/messageSlice'
import { IoStopCircleOutline } from 'react-icons/io5'

interface IGenerateMessageProps {
  mode?: 'daibl' | 'gemini',
}

const GenerateMessage: FC<IGenerateMessageProps> = ({
  mode = 'daibl'
}) => {

  const messageRef = useRef<HTMLDivElement>(null)
  const { displayText, isGenerating } = useAppSelector(state => state.message)

  const dispatch = useAppDispatch()

  const handleStop = (): void => { dispatch(setIsGenerating(false)) }

  useEffect(() => {
    if (messageRef.current && isGenerating) {
      messageRef.current.parentElement!.scrollTop = messageRef.current.parentElement!.scrollHeight
    }
  }, [displayText])

  return (
    <div className={styles[`_container__${mode}`]} ref={messageRef}>
      <MessageTitle mode={mode} status={isGenerating} />
      <div className={styles._content}>
        <div className={styles._text}>
          <MarkDown text={displayText} />
        </div>
      </div>
      {isGenerating && (
        <Button
          buttonClassName={styles._stop}
          buttonIcon={<IoStopCircleOutline />}
          buttonIconColor={redColor}
          buttonIconSize={25}
          buttonText={''}
          buttonTextColor={redColor}
          buttonTextSize={13}
          buttonWidth={40}
          buttonHeight={40}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
          buttonBubbleColor={daiblColor}
          onClick={handleStop}
        />
      )}
    </div>
  )
}

export default memo(GenerateMessage)