import { IMessage } from '@/interfaces/message'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const convertMessagesToHistories = (messages: Array<IMessage>) => {
    const userHistories = messages.filter(message => message.role === 'user').map(({ message }) => ({ text: message }))
    const aiHistories = messages.filter(message => message.role === 'ai').map(({ message }) => ({ text: message }))
    return { userHistories, aiHistories }
}

export const genAI = new GoogleGenerativeAI(process.env.geminiApiKey as string)
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
