import { Metadata } from 'next'
import { FC, ReactElement, ReactNode } from 'react'

interface ICreditLayoutProps {
    children: ReactNode | ReactElement
}

export const metadata: Metadata = {
    title: 'Credit',
    description: 'Credit Prediction',
}

const CreditLayout: FC<ICreditLayoutProps> = ({ children }) => {
    return <>{children}</>
}

export default CreditLayout