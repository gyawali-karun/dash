import { fetchUsers } from "@/api/userApi";
import type { User } from "@/types/user";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const loadUsers = createAsyncThunk<
  User[],
  { page: number; limit: number },
  { rejectValue: string }
>("users/load", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const data = await fetchUsers(page, limit);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to load users");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(
        loadUsers.pending,
        (state: { loading: boolean; error: null }) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        loadUsers.fulfilled,
        (
          state: { items: User[]; loading: boolean },
          action: PayloadAction<User[]>
        ) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        loadUsers.rejected,
        (
          state: { loading: boolean; error: string },
          action: { payload: string }
        ) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default usersSlice.reducer;
