// import { ISessionTitle } from '@/interfaces/sessionTitle'
import { createSlice, PayloadAction } from '@/redux/index'

export interface ISessionTitle {
    sessionID: string
    title: { 
        timestamp: number
        title: string 
    }
} 

export interface ISessionState{
    isShowing: boolean
    sessionTitles: Array<ISessionTitle> 
}

const initialState: ISessionState = {
    isShowing: false,
    sessionTitles: [],
}

const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setIsShowing(state, action: PayloadAction<boolean>) {
            state.isShowing = action.payload
        },
        setSessionTitles(state, action: PayloadAction<Array<ISessionTitle>>) {
            state.sessionTitles = action.payload
        },
        updateSessionTitle(state, action: PayloadAction<{ sessionID: string;  title: string }>) {
            const index = state.sessionTitles.findIndex((title) => title.sessionID === action.payload.sessionID)
            if (index !== -1) {
                state.sessionTitles[index].title.title = action.payload.title
            }
        },
        deleteSessionTitle(state, action: PayloadAction<string>) {
            state.sessionTitles = state.sessionTitles.filter((title) => title.sessionID !== action.payload)
        },
    }
})

export const { setIsShowing, setSessionTitles, updateSessionTitle, deleteSessionTitle } = SessionSlice.actions
export default SessionSlice.reducer


