import { Metadata } from 'next'
import { FC, ReactElement, ReactNode } from 'react'

interface IDAIBLLayoutProps {
    children: ReactNode | ReactElement
}

export const metadata: Metadata = {
    title: 'DAIBL',
    description: 'DAIBL - Dự đoán cảm xúc bình luận.',
}

const DAIBLLayout: FC<IDAIBLLayoutProps> = ({ children }) => {

    return (
        <html lang='en'>
            <body>
                {children}
            </body>
        </html>
    )
}

export default DAIBLLayout