import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from './supabaseClient';

// REAL SUPABASE CRUD: Fetch all students from the database
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('name', { ascending: true }); // Alphabetical order

      if (error) throw error;
      
      // Map the snake_case DB columns to our frontend camelCase expectations
      return data.map(student => ({
        id: student.id,
        name: student.name,
        regNo: student.reg_no,
        grade: student.grade,
        attendanceRate: student.attendance_rate,
        feesStatus: student.fees_status
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // We can add local reducers here later if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Injects the live database array!
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;