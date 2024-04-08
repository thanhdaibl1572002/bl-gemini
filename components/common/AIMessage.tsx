'use client'
import { FC, memo, useEffect, useRef } from 'react'
import styles from '@/components/common/ai-message.module.sass'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { PiCopySimpleLight } from 'react-icons/pi'
import MarkDown from '@/components/common/MarkDown'
import Button from '@/components/forms/Button'
import MessageTitle from '@/components/common/MessageTitle'

interface IAIMessageProps {
    mode?: 'daibl' | 'gemini',
    text?: string
}

const AIMessage: FC<IAIMessageProps> = ({
    mode = 'daibl',
    text,
}) => {
    const messageRef = useRef<HTMLDivElement>(null)
    const textResultRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.parentElement!.scrollTop = messageRef.current.parentElement!.scrollHeight
        }
    }, [])

    const copyToClipboard = (): void => {
        const content = textResultRef.current!.textContent
        content && navigator.clipboard.writeText(content.replace(/\s+/g, ' ').trim())
    }

    return (
        <div className={styles[`_container__${mode}`]} ref={messageRef}>
            <MessageTitle mode={mode} />
            <div className={styles._content}>
                <div className={styles._text} ref={textResultRef} >
                    <MarkDown text={text} />
                </div>
            </div>
            <Button
                buttonIcon={<PiCopySimpleLight />}
                buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                buttonIconSize={23}
                buttonText={'Sao Chép'}
                buttonTextColor={mode === 'daibl' ? daiblColor : geminiColor}
                buttonTextSize={13}
                buttonWidth={'fit-content'}
                buttonHeight={33}
                buttonBackground={whiteColor}
                buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
                buttonBubbleColor={daiblColor}
                onClick={copyToClipboard}
            />
        </div>
    )
}

export default memo(AIMessage)