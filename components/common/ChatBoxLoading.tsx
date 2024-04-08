import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styles from '@/components/common/chatbox-loading.module.sass'
import { daiblColor, geminiColor, getColorLevel } from '@/variables/variables'

interface IChatBoxLoading {
    mode?: 'daibl' | 'gemini'
}

const ChatBoxLoading: FC<IChatBoxLoading> = ({
    mode = 'daibl',
}) => {
    return (
        <ul className={styles._container}>
            {[...Array(5)].map((_, index) => (
                <li key={index}>
                    <SkeletonTheme
                        baseColor={getColorLevel(mode === 'daibl' ? daiblColor : geminiColor, 5)}
                        highlightColor="#ffffff"
                    >
                        <Skeleton containerClassName={styles._item} />
                    </SkeletonTheme>
                </li>
            ))}
        </ul>
    )
}

export default ChatBoxLoading