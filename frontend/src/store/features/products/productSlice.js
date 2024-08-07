import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
const initialState = {
  products: [],
  status: 'idle',
  error: null
}
export const addProduct = createAsyncThunk('product/addProduct', async (inputValues, thunkAPI) => {
  try {
    const response = await productService.createProduct(inputValues)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, thunkAPI) => {
  try {
    const response = await productService.getAllProducts()
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getPaginatedProducts = createAsyncThunk('product/getPaginatedProducts', async (inputValues, thunkAPI) => {
  try {
    const response = await productService.getPaginatedProducts(inputValues.page, inputValues.limit)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
  try {
    const response = await productService.deleteProduct(id)
    console.log(response)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const updateProduct = createAsyncThunk('product/updateProduct', async (inputValues, thunkAPI) => {
  try {
    const response = await productService.updateProduct(inputValues)
    return response
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    }).addCase(addProduct.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    }).addCase(addProduct.pending, (state) => {
      state.status = "loading"
      state.error = null
    })

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = "success"
      state.error = null
    }).addCase(getAllProducts.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
      state.products = []
    }).addCase(getAllProducts.pending, (state) => {
      state.status = "loading"
      state.error = null
    })

    builder.addCase(getPaginatedProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = "success"
      state.error = null
    }).addCase(getPaginatedProducts.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
      state.products = []
    }).addCase(getPaginatedProducts.pending, (state) => {
      state.status = "loading"
      state.error = null
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    }).addCase(deleteProduct.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    }).addCase(deleteProduct.pending, (state) => {
      state.status = "loading"
      state.error = null
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    }).addCase(updateProduct.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    }).addCase(updateProduct.pending, (state) => {
      state.status = "loading"
      state.error = null
    })

  }
})


export default productSlice.reducer

