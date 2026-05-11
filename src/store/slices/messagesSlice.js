import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    sessionStart: null,
  },
  reducers: {
    addMessage(state, action) {
      if (!state.sessionStart) state.sessionStart = new Date().toISOString()
      state.list.push(action.payload)
    },
    resetConversation(state) {
      state.list = []
      state.sessionStart = null
    },
  },
})

export const { addMessage, resetConversation } = messagesSlice.actions
export const selectMessages = s => s.messages.list
export const selectSessionStart = s => s.messages.sessionStart
export const selectTotalMessages = s => s.messages.list.length
export default messagesSlice.reducer
