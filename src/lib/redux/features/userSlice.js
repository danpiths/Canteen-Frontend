import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serverFetch from '../../axios/serverFetch';

const initialState = {
  name: '',
  role: '',
  userId: '',
  isLoading: false,
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await serverFetch('/users/showMe');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.role = payload.role;
      state.userId = payload.userId;
    },
    clearUser: state => {
      localStorage.removeItem('user');
      state.name = initialState.name;
      state.role = initialState.role;
      state.userId = initialState.userId;
    },
  },
  extraReducers: {
    [getUser.pending]: state => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.name = action.payload.user.name;
        state.role = action.payload.user.role;
        state.userId = action.payload.user.userId;
      }
    },
    [getUser.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
