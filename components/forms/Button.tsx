'use client'
import { ButtonHTMLAttributes, FC, ReactElement, ReactNode, MouseEvent, useState, useRef, useEffect, useCallback, memo } from 'react'
import styles from '@/components/forms/button.module.sass'
import { AiOutlineLoading } from 'react-icons/ai'
import { getColorLevel, whiteColor } from '@/variables/variables'
import { useRouter } from 'next/navigation'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonWidth?: string | number
    buttonHeight?: string | number
    buttonText?: string
    buttonTextSize?: number
    buttonTextColor?: string
    buttonTextWeight?: number
    buttonIcon?: ReactNode | ReactElement
    buttonIconSize?: number
    buttonIconColor?: string
    buttonIconPosition?: 'left' | 'right'
    buttonBorder?: string
    buttonBorderRadius?: string
    buttonBoxShadow?: string
    buttonIsLoading?: boolean
    buttonBackground?: string
    buttonBubbleColor?: string
    buttonAnimateDuration?: number
    buttonLink?: string
    buttonClassName?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<IButtonProps> = ({
    buttonWidth,
    buttonHeight,
    buttonText,
    buttonTextSize,
    buttonTextColor,
    buttonTextWeight,
    buttonIcon,
    buttonIconSize,
    buttonIconColor,
    buttonIconPosition = 'left',
    buttonBorder,
    buttonBorderRadius,
    buttonBoxShadow,
    buttonIsLoading,
    buttonBackground,
    buttonBubbleColor = whiteColor,
    buttonAnimateDuration = 400,
    buttonLink,
    buttonClassName,
    onClick,
    ...rest
}) => {

    const router = useRouter()

    const [bubbles, setBubbles] = useState<{ x: number, y: number }[]>([])

    const buttonRef = useRef<HTMLButtonElement>(null)
    const bubbleRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (bubbleRef.current) {
            bubbleRef.current.style.setProperty('--animate-duration', `${buttonAnimateDuration}ms`)
        }
    }, [buttonAnimateDuration, bubbles])

    const handleClick = useCallback(
        async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x: number = event.clientX - rect.left
            const y: number = event.clientY - rect.top
            setBubbles([...bubbles, { x, y }])
            setTimeout(() => setBubbles(bubbles.slice(1)), buttonAnimateDuration)
            onClick && onClick(event)
            buttonLink && router.push(buttonLink)
        },
        [onClick, bubbles, buttonAnimateDuration]
    )

    return (
        <button
            className={`${styles._container} ${buttonClassName || ''}`.trim()}
            style={{
                width: buttonWidth,
                height: buttonHeight,
                border: buttonBorder,
                borderRadius: buttonBorderRadius,
                background: buttonBackground,
                boxShadow: buttonBoxShadow,
                flexDirection: buttonIconPosition === 'left' ? 'row' : 'row-reverse',
            }}
            onClick={handleClick}
            ref={buttonRef}
            {...rest}
        >
            {buttonIcon &&
                <div className={buttonIsLoading ? styles._loading : styles._icon} style={{ fontSize: buttonIconSize, color: buttonIconColor }}>
                    {buttonIsLoading ? <AiOutlineLoading /> : buttonIcon}
                </div>
            }
            {buttonText &&
                <div className={styles._text} style={{ fontSize: buttonTextSize, fontWeight: buttonTextWeight, color: buttonTextColor }}>
                    {buttonText}
                </div>
            }
            {bubbles.length > 0 && bubbles.map((bubble, index) => (
                <span
                    key={index}
                    ref={bubbleRef}
                    className={styles._bubble}
                    style={{
                        width: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                        height: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                        left: bubble.x,
                        top: bubble.y,
                        background: getColorLevel(buttonBubbleColor, 40),
                    }}
                >
                </span>
            ))}
        </button>
    )
}

export default memo(Button)
