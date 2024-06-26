import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  data: [],
  status: "idle",
  error: null
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.data.includes(action.payload)
      if (exists) {
        state.error = "duplicate"
      }
      else {
        state.data = [...state.data, action.payload]
      }
    },
  },

})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
