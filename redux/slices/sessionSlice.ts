import { ISessionTitle } from "@/interfaces/sessionTitle"
import { PayloadAction, createSlice } from "@/redux"

export interface ISessionState {
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
        addSessionTitle(state, action: PayloadAction<ISessionTitle>) {
            state.sessionTitles.unshift(action.payload)
        },
        updateSessionTitle(state, action: PayloadAction<ISessionTitle>) {
            const index = state.sessionTitles.findIndex((title) => title.sessionID === action.payload.sessionID)
            if (index !== -1) {
                state.sessionTitles[index].title = action.payload.title
            }
        },
        deleteSessionTitle(state, action: PayloadAction<ISessionTitle['sessionID']>) {
            state.sessionTitles = state.sessionTitles.filter((title) => title.sessionID !== action.payload)
        },
    }
})


export const { setIsShowing, setSessionTitles, addSessionTitle, updateSessionTitle, deleteSessionTitle } = SessionSlice.actions
export default SessionSlice.reducer