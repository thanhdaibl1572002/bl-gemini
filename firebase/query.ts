import { child, get, limitToLast, push, query, ref, set } from 'firebase/database'
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
                title: (value as ISessionTitle['title']),
            }))
            return titles
        } else {
            return []
        }
    } catch (error) {
        throw error
    }
}

export const writeTestMessages = async (
    mode: 'daibl' | 'gemini', 
    userID: string, 
    sessionID: string
): Promise<void> => {
    const messageRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}/${sessionID}`)
    await set(push(messageRef), { role: 'ai', message: 'Đây là tin nhắn thứ 1' })
    await set(push(messageRef), { role: 'user', message: 'Đây là tin nhắn thứ 2' })
    await set(push(messageRef), { role: 'ai', message: 'Đây là tin nhắn thứ 3' })
    await set(push(messageRef), { role: 'user', message: 'Đây là tin nhắn thứ 4' })
    await set(push(messageRef), { role: 'ai', message: 'Đây là tin nhắn thứ 5' })
    await set(push(messageRef), { role: 'user', message: 'Đây là tin nhắn thứ 6' })
    await set(push(messageRef), { role: 'ai', message: 'Đây là tin nhắn thứ 7' })
    await set(push(messageRef), { role: 'user', message: 'Đây là tin nhắn thứ 8' })
    await set(push(messageRef), { role: 'ai', message: 'Đây là tin nhắn thứ 9' })
    await set(push(messageRef), { role: 'user', message: 'Đây là tin nhắn thứ 10' })
}