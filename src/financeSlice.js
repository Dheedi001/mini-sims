import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInvoices = createAsyncThunk('finance/fetchInvoices', async () => {
  try {
    const response = await axios.get('http://localhost:5000/invoices');
    return response.data;
  } catch (error) {
    console.warn("Backend unavailable. Injecting Vercel deployment fallback data.");
    // FALLBACK DATA FOR VERCEL
    return [
      { id: 101, studentId: 1, amount: 50000, dueDate: "2026-08-01", status: "Pending" },
      { id: 102, studentId: 2, amount: 75000, dueDate: "2026-07-15", status: "Paid" },
      { id: 103, studentId: 3, amount: 120000, dueDate: "2026-07-20", status: "Pending" },
      { id: 104, studentId: 4, amount: 85000, dueDate: "2026-08-05", status: "Pending" }
    ];
  }
});

const financeSlice = createSlice({
  name: 'finance',
  initialState: { invoices: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default financeSlice.reducer;