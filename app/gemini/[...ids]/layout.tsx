import { Metadata } from 'next'
import { FC, ReactElement, ReactNode } from 'react'

interface IGeminiLayoutProps {
    children: ReactNode | ReactElement
}

export const metadata: Metadata = {
    title: 'Gemini',
    description: 'Gemini - Google AI.',
}

const GeminiLayout: FC<IGeminiLayoutProps> = ({ children }) => {
    return <>{children}</>
}

export default GeminiLayout