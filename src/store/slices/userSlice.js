import { createSlice } from '@reduxjs/toolkit'

const AVATARS = ['👨‍⚕️', '👩‍⚕️', '🧑‍⚕️', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🔬', '👩‍🔬']

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Agent NeoCare',
    avatar: '👨‍⚕️',
    avatarList: AVATARS,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
  },
})

export const { setName, setAvatar } = userSlice.actions
export const selectUser = s => s.user
export default userSlice.reducer
