'use client'
import { FC } from 'react'
import styles from '@/app/daibl/[...ids]/daibl.module.sass'
import Header from '@/components/layouts/Header'
import ChatBox from '@/components/layouts/ChatBox'
import Footer from '@/components/layouts/Footer'
import Sessions from '@/components/layouts/Sessions'

interface IDAIBLProps {
    params: {
        ids: Array<string>
    }
}

const DAIBL: FC<IDAIBLProps> = ({ params }) => {

    const userID = params.ids[0]
    const sessionID = params.ids[1]

    return (
        <div className={styles._container__daibl}>
            {userID && sessionID && (
                <>
                    <Header mode={'daibl'} />
                    <ChatBox mode={'daibl'} userID={userID} sessionID={sessionID} />
                    <Footer mode={'daibl'} userID={userID} sessionID={sessionID} />
                    <Sessions mode={'daibl'} userID={userID} sessionID={sessionID} />
                </>
            )}
        </div>
    )
}

export default DAIBL