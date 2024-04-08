'use client'
import { FC } from 'react'
import styles from '@/app/gemini/[...ids]/gemini.module.sass'
import Header from '@/components/layouts/Header'
import ChatBox from '@/components/layouts/ChatBox'
import Footer from '@/components/layouts/Footer'
import dynamic from 'next/dynamic'

interface IGeminiProps {
    params: {
        ids: Array<string>
    }
}

const Sessions = dynamic(() => import('@/components/layouts/Sessions'))

const Gemini: FC<IGeminiProps> = ({ params }) => {

    const userID = params.ids[0]
    const sessionID = params.ids[1]

    return (
        <div className={styles._container__gemini}>
            {userID && sessionID && (
                <>
                    <Header mode={'gemini'} />
                    <ChatBox mode={'gemini'} userID={userID} sessionID={sessionID} />
                    <Footer mode={'gemini'} userID={userID} sessionID={sessionID} />
                    <Sessions mode={'gemini'} userID={userID} sessionID={sessionID} />
                </>
            )}
        </div>
    )
}

export default Gemini