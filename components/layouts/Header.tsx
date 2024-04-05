import { FC } from 'react'
import styles from '@/components/layouts/header.module.sass'
import Logo from '@/components/layouts/Logo'
import Button from '@/components/forms/Button'
import { SiNintendogamecube } from 'react-icons/si'
import { IoCardOutline } from 'react-icons/io5'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { RiBardLine } from 'react-icons/ri'
import { useAppSelector } from '@/redux'

interface IHeaderProps {
  mode?: 'daibl' | 'gemini'
}

const Header: FC<IHeaderProps> = ({
  mode = 'daibl',
}) => {

  const { isGenerating } = useAppSelector(state => state.generateMessage)

  return (
    <div className={styles[`_container__${mode}`]}>
      <Logo
        logoText={mode === 'daibl' ? 'DAIBL' : 'GEMINI'}
        logoTextColor={mode === 'daibl' ? daiblColor : geminiColor}
        logoIcon={mode === 'daibl' ? <SiNintendogamecube /> : <RiBardLine />}
        logoIconColor={mode === 'daibl' ? daiblColor : geminiColor}
      />
      <div className={styles._navigation}>
        <Button
          buttonIcon={mode === 'daibl' ? <RiBardLine /> : <SiNintendogamecube />}
          buttonIconColor={mode === 'daibl' ? geminiColor : daiblColor}
          buttonIconSize={mode === 'daibl' ? 25: 23}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? geminiColor : daiblColor, 10)}`}
          buttonBubbleColor={geminiColor}
          buttonLink={mode === 'daibl' ? '/gemini' : '/'}
          disabled={isGenerating}
        />

        <Button
          buttonIcon={<IoCardOutline />}
          buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
          buttonIconSize={25}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
          buttonBubbleColor={daiblColor}
          disabled={isGenerating}
        />
      </div>
    </div>
  )
}

export default Header