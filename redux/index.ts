import { useDispatch, useSelector, Provider } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import generateMessageReducer from '@/redux/slices/generateMessage'
import sessionTitlesReducer from '@/redux/slices/sessionTitle'

const store = configureStore({
  reducer: {
    generateMessage: generateMessageReducer,
    sessionTitles: sessionTitlesReducer,
  },
})

const useAppDispatch: () => typeof store.dispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export { store, PayloadAction, createSlice, Provider, useAppDispatch, useAppSelector }
