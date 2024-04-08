import { child, get, limitToLast, query, ref } from 'firebase/database'
import { IMessage } from '@/interfaces/message'
import { firebaseRealtimeDatabase } from '@/firebase'
import { ISessionTitle } from '@/interfaces/sessionTitle'

export const getLimitedMessages = async (
    mode: 'daibl' | 'gemini',
    userID: string,
    sessionID: string,
    limit: number = 10,
): Promise<Array<IMessage>> => {
    try {
        const sessionRef = child(ref(firebaseRealtimeDatabase), `${mode}/${userID}/sessions/${sessionID}`)
        const q = query(sessionRef, limitToLast(limit))
        // console.log(limit)
        const snapshot = await get(q)
        if (snapshot.exists()) {
            const data = snapshot.val()
            const messages: Array<IMessage> = Object.entries(data).map(([key, value]) => ({
                role: (value as IMessage).role,
                message: (value as IMessage).message,
            }))
            return messages
        } else {
            return []
        }
    } catch (error) {
        throw error
    }
}


export const getLimitedSessionTitles = async (
    mode: 'daibl' | 'gemini',
    userID: string,
    limit: number = 10,
): Promise<Array<ISessionTitle>> => {
    try {
        const titlesRef = child(ref(firebaseRealtimeDatabase), `${mode}/${userID}/titles`)
        const q = query(titlesRef, limitToLast(limit))
        const snapshot = await get(q)
        if (snapshot.exists()) {
            const data = snapshot.val()
            const titles: Array<ISessionTitle> = Object.entries(data).map(([key, value]) => ({
                sessionID: key,
                title: value as ISessionTitle['title'],
            }))
            return titles.reverse()
        } else {
            return []
        }
    } catch (error) {
        throw error
    }
}


export const getLatestSessionID = async (
    mode: 'daibl' | 'gemini', 
    userID: string,
): Promise<string | null> => {
    let latestSessionID = null
    try {
        const q = query(ref(firebaseRealtimeDatabase, `${mode}/${userID}/titles`), limitToLast(1))
        const snapshot = await get(q)
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                latestSessionID = childSnapshot.key
            })
        }
    } catch (error) {
        throw error
    }
    return latestSessionID
}