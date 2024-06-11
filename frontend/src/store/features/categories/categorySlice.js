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
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    const response = await categoryService.deleteCategory(id)
    console.log(response)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const updateCategory = createAsyncThunk('category/updateCategory', async (id, thunkAPI) => {
  try {
    console.log(id)
    const slug = id[0]
    const newName = id[1]
    const response = await categoryService.updateCategory(slug, newName)
    console.log(response)
    return response
  }
  catch (error) {
    console.log("inside error categorySlice")
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
    builder.addCase(deleteCategory.pending, (state) => {
      state.error = null
    }).addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = 'success'
    }).addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    })
    builder.addCase(updateCategory.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
    }).addCase(updateCategory.fulfilled, (state, action) => {
      state.status = 'success'
      state.error = null
    }).addCase(updateCategory.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { category } = categorySlice.actions

export default categorySlice.reducer
