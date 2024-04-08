import { FC } from 'react'
import styles from '@/components/common/loading.module.sass'

interface ILoadingProps {
    mode?: 'daibl' | 'gemini',
    loadingText?: string
}

const Loading: FC<ILoadingProps> = ({
    mode = 'daibl',
    loadingText = 'Đang khởi tạo cuộc trò chuyện'
}) => {
  return (
    <div className={styles[`_container__${mode}`]}>
        <div className={styles._loader}></div>
        {loadingText}
    </div>
  )
}

export default Loading