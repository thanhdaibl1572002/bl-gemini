'use client'
import { FC, ReactElement, ReactNode } from 'react'
import '@/app/globals.sass'
import { Provider, store } from '@/redux'

interface IRootLayoutProps {
  children: ReactNode | ReactElement
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {

  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout