import { FC } from 'react'
import styles from '@/components/layouts/welcome.module.sass'
import Logo from './Logo'
import { daiblColor, geminiColor } from '@/variables/variables'
import { SiNintendogamecube } from 'react-icons/si'
import { RiBardLine } from 'react-icons/ri'

interface IWelcomeProps {
    mode?: 'daibl' | 'gemini'
}

const Welcome: FC<IWelcomeProps> = ({
    mode = 'daibl',
}) => {
    return (
        <div className={styles[`_container__${mode}`]}>
            <div className={styles._title}>
                <Logo
                    logoTextSize={45}
                    logoText={''}
                    logoIcon={mode === 'daibl' ? <SiNintendogamecube /> : <RiBardLine />}
                    logoIconColor={mode === 'daibl' ? daiblColor : geminiColor}
                    logoIconSize={120}
                    logoLink={'#'}
                />
            </div>
            <div className={styles._content}>
                <div className={styles._item}>
                    <strong>Lập trình</strong>
                    Viết mã Python tạo màn hình Game đơn giản 😊
                </div>
                <div className={styles._item}>
                    <strong>Làm thơ</strong>
                    Làm một bài thơ tự do về mặt trời và mặt trăng 🥰
                </div>
                <div className={styles._item}>
                    <strong>Thể hình</strong>
                    Các bài tập giúp giảm cân nhanh và hiệu quả 😎
                </div>
                <div className={styles._item}>
                    <strong>Nấu ăn</strong>
                    Công thức nấu các món ngon và đơn giản 😋
                </div>
                <div className={styles._item}>
                    <strong>Lời khuyên</strong>
                    Cho lời khuyên về cách học tập hiệu quả 😇
                </div>
                <div className={styles._item}>
                    <strong>Kể chuyện</strong>
                    Hãy kể câu chuyện cổ tích về cô bé lọ lem 😍
                </div>
            </div>
        </div>
    )
}

export default Welcome