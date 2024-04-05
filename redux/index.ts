import { useDispatch, useSelector, Provider } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import generateMessageReducer from '@/redux/slices/generateMessage'

const store = configureStore({
  reducer: {
    generateMessage: generateMessageReducer,
  },
})

const useAppDispatch: () => typeof store.dispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export { store, PayloadAction, createSlice, Provider, useAppDispatch, useAppSelector }
