import { FC, ReactElement, ReactNode } from 'react'
import styles from '@/components/layouts/logo.module.sass'
import Link from 'next/link'
import { SiNintendogamecube } from 'react-icons/si'
import { daiblColor } from '@/variables/variables'

interface ILogoProps {
    logoText?: string
    logoTextSize?: number | string
    logoTextColor?: string
    logoIcon?: ReactNode | ReactElement
    logoIconSize?: number | string
    logoIconColor?: string
}

const Logo: FC<ILogoProps> = ({
    logoText = 'DAIBL',
    logoTextSize = '12px',
    logoTextColor = daiblColor,
    logoIcon = <SiNintendogamecube />,
    logoIconSize = 32,
    logoIconColor = daiblColor,
}) => {
    return (
        <Link
            href={'/'}
            className={styles._container}
        >
            <span style={{ fontSize: logoIconSize, color: logoIconColor }}>{logoIcon}</span>
            <h1 style={{ fontSize: logoTextSize, color: logoTextColor }}>{logoText}</h1>
        </Link>
    )
}

export default Logo