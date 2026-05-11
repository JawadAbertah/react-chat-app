import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './slices/messagesSlice'
import userReducer from './slices/userSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
    settings: settingsReducer,
  },
})
