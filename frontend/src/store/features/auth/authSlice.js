import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getUserDateFromLocalStorage = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
const initialState = {
  user: getUserDateFromLocalStorage,
  status: 'idle',
  error: null
}
export const login = createAsyncThunk('auth/login', async (inputValues, thunkAPI) => {
  try {
    return await authService.loginUser(inputValues)
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      state.value = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading'
    }).addCase(login.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload
    }).addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { auth } = authSlice.actions

export default authSlice.reducer
