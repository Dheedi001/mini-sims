import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Check if user is already logged in from a previous session
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('miniSimsAuth');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const initialState = persistedState || {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    // Standard mock authentication
    if (email === 'admin' || email === 'admin@sims.edu.ng') {
      return { id: 1, full_name: 'System Admin', role: 'admin' };
    } else if (email === 'lecturer' || email === 'lecturer@sims.edu.ng') {
      return { id: 2, full_name: 'Dr. Jane Smith', role: 'lecturer' };
    } else if (email === '202600142@sims.edu.ng' || email === 'student') {
      return { id: 3, full_name: 'Destiny Enobong', role: 'student' };
    } else {
      return rejectWithValue('Invalid credentials');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      localStorage.removeItem('miniSimsAuth'); // Wipe session on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        
        // Save the session to browser storage!
        localStorage.setItem('miniSimsAuth', JSON.stringify({
          user: action.payload,
          isAuthenticated: true,
          status: 'succeeded'
        }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;