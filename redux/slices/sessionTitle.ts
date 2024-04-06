import { ISessionTitle } from '@/interfaces/sessionTitle'
import { createSlice, PayloadAction } from '@/redux/index'


interface ISessionTitlesState {
    sessionTitles: Array<ISessionTitle>
}

const initialState: ISessionTitlesState = {
    sessionTitles: []
}

const SessionTitleSlice = createSlice({
    name: 'sessionTitles',
    initialState,
    reducers: {
        setSessionTitles(state, action: PayloadAction<Array<ISessionTitle>>) {
            state.sessionTitles = action.payload
        },
        deleteSessionTitle(state, action: PayloadAction<ISessionTitle['sessionID']>) {
            state.sessionTitles = state.sessionTitles.filter(
                (sessionTitle) => sessionTitle.sessionID !== action.payload
            )
        },
        editSessionTitle(state, action: PayloadAction<{ sessionID: string, newTitle: string }>) {
            const { sessionID, newTitle } = action.payload
            state.sessionTitles = state.sessionTitles.map((sessionTitle) =>
              sessionTitle.sessionID === sessionID ? { ...sessionTitle, title: newTitle } : sessionTitle
            )
        }
    }
})

export const { setSessionTitles, deleteSessionTitle, editSessionTitle } = SessionTitleSlice.actions
export default SessionTitleSlice.reducer
