'use client'
import { FC, memo, useState } from 'react'
import styles from '@/components/forms/radiogroup.module.sass'
import { IoCheckmarkOutline } from 'react-icons/io5'

interface Option {
  label: string
  value: string
}

interface RadioGroupProps {
  options: Option[]
  width?: number | string
  height?: number | string
  columnGap?: number
  rowGap?: number
  itemMinWidth?: number
  itemGap?: number
  boxSize?: number
  boxBackground?: string
  checkSize?: number
  checkColor?: string
  checkedBoxBackground?: string
  checkedColor?: string
  textSize?: number
  textColor?: string
  textWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  border?: string
  borderRadius?: number | string
  onChange: (selectedValue: string) => void
}

const RadioGroup: FC<RadioGroupProps> = ({ 
  options, 
  width = '100%',
  height,
  columnGap = 10,
  rowGap = 10,
  itemMinWidth = 120,
  itemGap = 5,
  boxSize = 16,
  boxBackground,
  checkSize = 12,
  checkColor = 'rgb(39, 142, 255)',
  checkedBoxBackground = 'rgb(39, 142, 255)',
  checkedColor = 'rgb(255, 255, 255)',
  textSize = 15,
  textColor,
  textWeight,
  border = '1px solid rgba(39, 142, 255, 0.5)',
  borderRadius = '50%',
  onChange 
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handleRadioChange = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange(optionValue)
  }

  return (
    <div
    className={styles._container}
      style={{
        width: width,
        height: height,
        columnGap: columnGap,
        rowGap: rowGap,
        gridTemplateColumns: `repeat(auto-fit, minmax(${itemMinWidth}px, 1fr))`
      }}
    >
      {options.map(option => {
        const isChecked = selectedValue === option.value
        return (
          <label 
            key={option.value}
            style={{
              fontSize: textSize,
              fontWeight: textWeight,
              color: textColor,
              gap: itemGap,
            }}
          >
          <span 
              style={{
                width: boxSize,
                height: boxSize,
                background: isChecked ? checkedBoxBackground : boxBackground,
                fontSize: isChecked ? checkSize : 0,
                color: isChecked ? checkedColor : checkColor,
                border: isChecked ? 'none' : border,
                borderRadius: borderRadius,
              }}
            >
              <IoCheckmarkOutline />
            </span>
          <input
            type='radio'
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleRadioChange(option.value)}
          />
          {option.label}
        </label>
        )
      })}
    </div>
  )
}

export default memo(RadioGroup)
