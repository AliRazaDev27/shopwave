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
    const response = await authService.loginUser(inputValues)
    window.localStorage.setItem("user", JSON.stringify(response))
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const register = createAsyncThunk('auth/register', async (inputValues, thunkAPI) => {
  try {
    const response = await authService.registerUser(inputValues)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    const response = await authService.logoutUser()
    window.localStorage.removeItem('user')
    return response
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
      state.error = null
    }).addCase(login.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload
    }).addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(register.pending, (state) => {
      state.status = 'loading'
      state.error = null
    }).addCase(register.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload
    }).addCase(register.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })

    builder.addCase(logout.pending, (state) => {
      state.status = 'loading'
      state.error = null
    }).addCase(logout.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = null
    }).addCase(logout.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { auth } = authSlice.actions

export default authSlice.reducer
