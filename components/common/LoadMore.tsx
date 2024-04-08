import { FC } from 'react'
import styles from '@/components/common/load-more.module.sass'

interface ILoadMoreProps {
    mode?: 'daibl' | 'gemini'
}

const LoadMore: FC<ILoadMoreProps> = ({
    mode = 'daibl',
}) => {
  return (
    <div className={styles[`_container__${mode}`]}>
        <div className={styles._loader}></div>
    </div>
  )
}

export default LoadMore