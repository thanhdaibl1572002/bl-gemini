export interface IMessage {
    role: 'user' | 'ai'
    message: string
    status?: boolean
}