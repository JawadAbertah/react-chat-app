import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false,
  name: "User",
  avatar: "/avatar1.png"
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload
    }
  }
})

export const { setDarkMode, setName, setAvatar } = settingsSlice.actions

// 👇 THIS WAS MISSING
export const selectSettings = (state) => state.settings

export default settingsSlice.reducer