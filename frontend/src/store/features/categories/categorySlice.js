import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
  categories: [],
  status: 'idle',
  error: null
}

export const addCategory = createAsyncThunk('category/addCategory', async (inputValues, thunkAPI) => {
  try {
    const response = await categoryService.createCategory(inputValues)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getAllCategories = createAsyncThunk('category/getAllCategories', async (_, thunkAPI) => {
  try {
    const response = await categoryService.getAllCategories()
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    category: (state, action) => {
      state.value = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.status = 'loading'
      state.error = null
    }).addCase(addCategory.fulfilled, (state, action) => {
      state.status = 'success'
      state.error = null
    }).addCase(addCategory.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(getAllCategories.pending, (state) => {
      state.status = 'loading'
      state.error = null
    }).addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.status = 'success'
    }).addCase(getAllCategories.rejected, (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    })
  }
})

// Action creators are generated for each case reducer function
export const { category } = categorySlice.actions

export default categorySlice.reducer
