export interface IMessage {
    key?: string
    role: 'user' | 'ai'
    message: string
}