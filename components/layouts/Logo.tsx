import { FC, ReactElement, ReactNode } from 'react'
import styles from '@/components/layouts/logo.module.sass'
import Link from 'next/link'
import { SiNintendogamecube } from 'react-icons/si'
import { daiblColor, whiteColor } from '@/variables/variables'

interface ILogoProps {
    logoText?: string
    logoTextSize?: number | string
    logoTextColor?: string
    logoIcon?: ReactNode | ReactElement
    logoIconSize?: number | string
    logoIconColor?: string
    logoLink?: string
}

const Logo: FC<ILogoProps> = ({
    logoText = 'DAIBL',
    logoTextSize = '12px',
    logoTextColor = whiteColor,
    logoIcon = <SiNintendogamecube />,
    logoIconSize = 32,
    logoIconColor = daiblColor,
    logoLink = '/'
}) => {
    return (
        <Link href={logoLink} className={styles._container}>
            <span
                style={{
                    fontSize: logoIconSize,
                    color: logoIconColor
                }}>
                {logoIcon}
            </span>
            <h1
                style={{
                    fontSize: logoTextSize,
                    color: logoTextColor,
                    WebkitTextStroke: `0.5px ${logoIconColor}`
                }}>
                {logoText}
            </h1>
        </Link>
    )
}

export default Logo