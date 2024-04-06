import { FC, useState } from 'react'
import styles from '@/components/layouts/header.module.sass'
import Logo from '@/components/layouts/Logo'
import Button from '@/components/forms/Button'
import { SiNintendogamecube } from 'react-icons/si'
import { daiblColor, geminiColor, getColorLevel, whiteColor } from '@/variables/variables'
import { RiBardLine } from 'react-icons/ri'
import { CiBoxList, CiCreditCard1 } from 'react-icons/ci'
import Sessions from './Sessions'

interface IHeaderProps {
  mode?: 'daibl' | 'gemini'
}

const Header: FC<IHeaderProps> = ({
  mode = 'daibl',
}) => {

  const [showSessions, setShowSessions] = useState<string>('')

  return (
    <div className={styles[`_container__${mode}`]}>
      <Sessions isShow={showSessions}/>
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
          buttonIconSize={mode === 'daibl' ? 25 : 23}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? geminiColor : daiblColor, 10)}`}
          buttonBubbleColor={geminiColor}
          buttonLink={mode === 'daibl' ? '/gemini' : '/'}
        />

        <Button
          buttonIcon={<CiCreditCard1 />}
          buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
          buttonIconSize={28}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
          buttonBubbleColor={daiblColor}
        />

        <Button
          buttonIcon={<CiBoxList />}
          buttonIconColor={mode === 'daibl' ? daiblColor : geminiColor}
          buttonIconSize={25}
          buttonWidth={38}
          buttonHeight={38}
          buttonBackground={whiteColor}
          buttonBorder={`1px solid ${getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 10)}`}
          buttonBubbleColor={daiblColor}
          onClick={() => setShowSessions(new Date().getTime().toString())}
        />
      </div>
    </div>
  )
}

export default Header