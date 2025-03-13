import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductsData from '../../data/serverResponse.json'

interface Product {
  quantity: number;
  last_operation: "increment" | "decrement";
}

interface CartState {
  added_products: Record<string, Product>;
  total: number;
  lastResulted: number;
  interaction: number;
}

const initialState: CartState = {
  added_products: {},
  total: 0,
  lastResulted: 0,
  interaction: 0,
};

const validatePositive = (digit: number) => {
  return digit < 0 ? 0 : digit;
};

const calculateTotal = (addedProducts: Record<string, Product>, serverResponse: any) => {
  let totalResulted = 0;
  Object.keys(addedProducts).forEach((key) => {
    const product = serverResponse[key];
    if (product) {
      let price = parseFloat(product.price);
      const quantity = addedProducts[key].quantity;
      if (!isNaN(price) && typeof quantity === "number") {
        totalResulted += price * quantity;
      }
    }
  });
  return totalResulted;
};

const serverResponse = ProductsData || "{}"

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Add: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.added_products[productId] || { quantity: 0, last_operation: "increment" };
      existingProduct.quantity += 1;
      state.added_products[productId] = existingProduct;
      state.lastResulted = state.total;
      state.total = calculateTotal(state.added_products, serverResponse);
      state.interaction += 1;
    },
    Decrease: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingProduct = state.added_products[productId];
      if (existingProduct) {
        existingProduct.quantity = validatePositive(existingProduct.quantity - 1);
        existingProduct.last_operation = "decrement";
        state.lastResulted = state.total;
        state.total = calculateTotal(state.added_products, serverResponse);
        state.interaction += 1;
      }
    },
    Complete_Removal: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.added_products[productId]) {
        state.added_products[productId].quantity = 0;
        state.added_products[productId].last_operation = "decrement";
        state.lastResulted = state.total;
        state.total = calculateTotal(state.added_products, serverResponse);
        state.interaction += 1;
      }
    },
  },
});

export const { Add, Decrease, Complete_Removal } = cartSlice.actions;
export default cartSlice.reducer;
