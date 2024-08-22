import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  name: string;
  email: string;
  phone: number;
  balance: number;
}

const savedUser = localStorage.getItem("user");
const parsedUser: UserState | null = savedUser ? JSON.parse(savedUser) as UserState : null;

const initialState: UserState = {
  _id: parsedUser?._id || "",
  name: parsedUser?.name || "",
  email: parsedUser?.email || "",
  phone: parsedUser?.phone || 0,
  balance: parsedUser?.balance || 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the user details
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    // Action to clear the user details (e.g., on logout)
    clearUser(state) {
      return initialState;
    },
    // Action to update the user's balance
    updateBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
  },
});

export const { setUser, clearUser, updateBalance } = userSlice.actions;
export default userSlice.reducer;
