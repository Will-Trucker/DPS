import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Product } from "../types/Product";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
addToCart: (
  state,
  action: PayloadAction<Product>
) => {

  const existingProduct = state.find(
    item => item.id === action.payload.id
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    state.push({
      ...action.payload
    });
  }
},

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      return state.filter(
        item => item.id !== action.payload
      );
    },

    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;