import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from '../thunk/fetchUser';
import type { UserData } from '../../interfaces/data.interfaces';

interface UserState {
  user: UserData | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<UserData | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
