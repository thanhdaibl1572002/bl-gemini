import { FC, memo } from 'react'
import styles from '@/components/common/message-title.module.sass'
import Logo from '@/components/layouts/Logo'
import { SiNintendogamecube } from 'react-icons/si'
import { RiBardLine, RiLoaderLine } from 'react-icons/ri'
import { daiblColor, geminiColor } from '@/variables/variables'
import { IoCheckmarkCircle } from 'react-icons/io5'

interface IMessageTitleProps {
    mode?: 'daibl' | 'gemini',
    status?: boolean
}

const MessageTitle: FC<IMessageTitleProps> = ({
    mode = 'daibl',
    status = false,
}) => {

    return (
        <div className={styles[`_container__${mode}`]}>
            <Logo
                logoText={''}
                logoIcon={mode === 'daibl' ? <SiNintendogamecube /> : <RiBardLine />}
                logoIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                logoIconSize={27}
            />
            {
                status
                    ? <span className={styles._generating}>Đang tạo câu trả lời <RiLoaderLine /></span>
                    : <span className={styles._complete}>Đã trả lời xong <IoCheckmarkCircle /></span>
            }
        </div>
    )
}

export default memo(MessageTitle)