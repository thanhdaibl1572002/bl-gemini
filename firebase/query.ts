import { child, get, limitToLast, push, query, ref, serverTimestamp, set } from 'firebase/database'
import { IMessage } from '@/interfaces/message'
import { firebaseRealtimeDatabase } from '@/firebase'

export const getLimitedMessages = async (mode: 'daibl' | 'gemini', userID: string, limit: number = 10): Promise<Array<IMessage>> => {
    try {
        const messageRef = child(ref(firebaseRealtimeDatabase), `${mode}/${userID}`)
        const q = query(messageRef, limitToLast(limit))
        const snapshot = await get(q)
        if (snapshot.exists()) {
            const data = snapshot.val()
            const messages: Array<IMessage> = Object.entries(data).map(([key, value]) => ({
                key: key,
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


export const writeTestMessages = async (mode: 'daibl' | 'gemini', userID: string): Promise<void> => {
    const messageRef = ref(firebaseRealtimeDatabase, `${mode}/${userID}`)
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

export const convertMessagesToHistories = (messages: Array<IMessage>) => {      
    const userHistories = messages.filter(message => message.role === 'user').map(({ message }) => ({ text: message }))
    const aiHistories = messages.filter(message => message.role === 'ai').map(({ message }) => ({ text: message }))
    return { userHistories, aiHistories }
}
