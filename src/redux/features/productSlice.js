import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, { payload }) => {
      state.products = payload
    },
    updateProduct: (state, { payload }) => {
      state.products = payload
    },
    updateSearchedProduct: (state, { payload }) => {
      state.searchedProducts = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProduct, updateProduct, updateSearchedProduct } = productSlice.actions

export default productSlice.reducer