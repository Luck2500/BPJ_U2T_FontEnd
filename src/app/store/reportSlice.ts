import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Report } from "../models/Report";
import agent from "../api/agent";

interface ReportState {
    report : Report[] | null
    reportLoaded : boolean
    datareport: Report | null
    datareportLoaded : boolean
}

const initialState: ReportState = {
  report: null,
  reportLoaded: false,
  datareport: null,
  datareportLoaded: false
};

export const fetchReport = createAsyncThunk<any>(
    "report/fetchReport",
    async (_, thunkAPI) => {
      try {
        return await agent.Report.getReport();
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    },
  );

  

  
  export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchReport.fulfilled, (state, action) => {
            state.datareport = action.payload.data;
            state.datareportLoaded = true;
            
        });
        
       
       
    })
  });
  
  // eslint-disable-next-line no-empty-pattern
  export const {} = reportSlice.actions;