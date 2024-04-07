import { useDispatch, useSelector, Provider } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import messageReducer from '@/redux/slices/messageSlice'
import sessionReducer from '@/redux/slices/sessionSlice'

const store = configureStore({
  reducer: {
    message: messageReducer,
    session: sessionReducer,
  },
})

const useAppDispatch: () => typeof store.dispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export { store, PayloadAction, createSlice, Provider, useAppDispatch, useAppSelector }
