import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from './supabaseClient';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Fetch the user's role from the custom profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      // Merge auth data with profile data (role, regNo, etc.)
      return { ...authData.user, ...profileData };
    } catch (error) {
      console.warn("Supabase auth failed. Using mock enterprise RBAC fallback.");
      
      // MOCK FALLBACKS FOR INSTANT UI TESTING
      if (email === 'admin' && password === 'admin123') {
        return { id: 'admin-1', role: 'admin', full_name: 'Destiny E.', password_changed: true };
      }
      if (email === 'lecturer' && password === 'lecturer123') {
        return { id: 'lec-1', role: 'lecturer', full_name: 'Dr. Smith', password_changed: true };
      }
      // UPDATE THIS LINE BELOW TO INCLUDE THE EMAIL EXTENSION
      if (email === '202600142@sims.edu.ng' && password === 'sims2026') {
        return { id: 'stu-1', role: 'student', full_name: 'John Doe', password_changed: false, regNo: '202600142' }; 
      }
      
      return rejectWithValue(error.message || 'Invalid credentials');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      supabase.auth.signOut();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload; // Contains user.role
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;