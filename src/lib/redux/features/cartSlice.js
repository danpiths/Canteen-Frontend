import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serverFetch from '../../axios/serverFetch';

const initialState = {
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  try {
    const { data } = await serverFetch('/cart/myCart');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (_, thunkAPI) => {
    try {
      const currentCart = thunkAPI.getState().cart;
      const { data } = await serverFetch.patch('/cart/updateCart', {
        totalPrice: currentCart.totalPrice,
        cartItems: currentCart.cartItems,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(item => item._id !== payload);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item._id === payload);
      cartItem.quantity += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(item => item._id === payload);
      cartItem.quantity -= 1;
    },
    add: (state, { payload }) => {
      state.cartItems.push({
        _id: payload._id,
        name: payload.name,
        quantity: 1,
        price: payload.price,
      });
    },
    calculateTotal: state => {
      let total = 0;
      state.cartItems.forEach(item => (total += item.quantity * item.price));
      state.totalPrice = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      action.payload && (state.cartItems = action.payload.userCart.cartItems);
    },
    [getCartItems.rejected]: state => {
      state.isLoading = false;
    },
    [updateCart.pending]: state => {
      state.isLoading = false;
    },
    [updateCart.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateCart.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default cartSlice.reducer;
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  add,
  calculateTotal,
} = cartSlice.actions;
