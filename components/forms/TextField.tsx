'use client'
import { CSSProperties, ChangeEvent, FC, ReactElement, ReactNode, memo, useRef, useState } from 'react'
import styles from '@/components/forms/textfield.module.sass'

interface InputCSSProperties extends CSSProperties {
  '--placeholder-size': string
  '--placeholder-color': string
  '--placeholder-weight': string
}

interface TextFieldProps {
  width?: number | string
  height?: number | string
  background?: string
  border?: string
  borderRadius?: number
  boxShadow?: string
  type?: 'text' | 'email' | 'number' | 'date' | 'month'
  label?: string
  labelWidth?: number
  labelHeight?: number
  labelPadding?: number | string
  labelBorder?: string
  labelBorderRadius?: number | string
  labelBackground?: string
  labelTextColor?: string
  labelTextSize?: number
  labelTextWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  labelIcon?: ReactNode | ReactElement
  labelIconColor?: string
  labelIconSize?: number
  value?: string
  placeholder?: string
  placeholderSize?: number
  placeholderWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  placeholderColor?: string
  padding?: string
  textSize?: number
  textWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  textColor?: string
  focusBorder?: string
  onChange: (value: string) => void
}

const TextField: FC<TextFieldProps> = ({
  width = 250,
  height = 45,
  background = 'rgba(255, 255, 255)',
  border = '1px solid rgba(39, 142, 255, 0.15)',
  borderRadius = 3,
  boxShadow,
  padding = '0 10px',
  type,
  label,
  labelWidth,
  labelHeight,
  labelPadding = '1px 5px',
  labelBorder,
  labelBorderRadius = 2,
  labelBackground = 'rgb(39, 142, 255)',
  labelTextColor = 'rgba(255, 255, 255)',
  labelTextSize = 12,
  labelTextWeight,
  labelIcon,
  labelIconColor,
  labelIconSize,
  value,
  placeholder,
  placeholderSize = 14,
  placeholderWeight = 400,
  placeholderColor = 'rgba(0 , 0 , 0, 0.5)',
  textSize = 15,
  textWeight,
  textColor,
  focusBorder = '1px solid rgb(39, 142, 255)',
  onChange
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '')
  const textFieldRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)
  }

  const inputStyles: InputCSSProperties = {
    padding: padding,
    fontSize: textSize,
    fontWeight: textWeight,
    color: textColor,
    borderRadius: borderRadius,
    '--placeholder-size': `${placeholderSize}px`,
    '--placeholder-color': placeholderColor,
    '--placeholder-weight': `${placeholderWeight}`,
  }

  return (
    <div
      className={styles._container}
      style={{
        width: width,
        height: height,
        background: background,
        border: border,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
      }}
      ref={textFieldRef}
    >
      {label && (
        <label
          style={{
            width: labelWidth,
            height: labelHeight,
            padding: labelPadding,
            background: labelBackground,
            fontSize: labelTextSize,
            fontWeight: labelTextWeight,
            color: labelTextColor,
            border: labelBorder,
            borderRadius: labelBorderRadius,
            left: 10,
            top: labelHeight ? -(labelHeight / 2) : -8.2,
          }}
        >
          {labelIcon && (
            <span
              style={{
                fontSize: labelIconSize,
                color: labelIconColor,
              }}
            >
              {labelIcon}
            </span>
          )}
          {label}
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        style={inputStyles}
        onChange={handleInputChange}
        onFocus={event => {
          focusBorder && (textFieldRef.current!.style.border = focusBorder)
        }}
        onBlur={event => {
          border && (textFieldRef.current!.style.border = border)
        }}
      />
    </div>
  )
}

export default memo(TextField)
