import { IMessage } from '@/interfaces/message'
import { createSlice, PayloadAction } from '@/redux/index'

export interface IGenerateMessage{
    isGenerating: boolean
    isComplete: boolean
    displayText: string
    messages: Array<IMessage>
}

const initialState: IGenerateMessage = {
    isGenerating: false,
    isComplete: false,
    displayText: '',
    messages: [],
}

const MessageStatusSlice = createSlice({
    name: 'generateMessage',
    initialState,
    reducers: {
        setIsGenerating(state, action: PayloadAction<boolean>) {
            state.isGenerating = action.payload
        },
        setIsComplete(state, action: PayloadAction<boolean>) {
            state.isComplete = action.payload
        },
        setDisplayText(state, action: PayloadAction<string>) {
            state.displayText = action.payload
        },
        setMessages(state, action: PayloadAction<Array<IMessage>>) {
            state.messages = action.payload
        },
        addNewMessage(state, action: PayloadAction<IMessage>) {
            state.messages.push(action.payload)
        },
        setMessageStatus(state, action: PayloadAction<IMessage>) {
            state.messages[state.messages.length - 1] = action.payload
        },
    }
})

export const { setIsGenerating, setIsComplete, setDisplayText, setMessages, addNewMessage, setMessageStatus } = MessageStatusSlice.actions
export default MessageStatusSlice.reducer
