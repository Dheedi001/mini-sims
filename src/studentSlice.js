import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  try {
    const response = await axios.get('http://localhost:5000/students');
    return response.data;
  } catch (error) {
    console.warn("Backend unavailable. Injecting Vercel deployment fallback data.");
    // FALLBACK DATA FOR VERCEL
    return [
      { id: 1, name: "Daniel O.", grade: "Year 2", attendanceRate: 85, feesBalance: 50000, status: "Active" },
      { id: 2, name: "Sarah J.", grade: "Year 1", attendanceRate: 98, feesBalance: 0, status: "Active" },
      { id: 3, name: "Michael B.", grade: "Year 3", attendanceRate: 60, feesBalance: 120000, status: "At Risk" },
      { id: 4, name: "David E.", grade: "Year 2", attendanceRate: 72, feesBalance: 85000, status: "At Risk" }
    ];
  }
});

const studentSlice = createSlice({
  name: 'students',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default studentSlice.reducer;