import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { District } from "../models/District";


interface DistrictState {
    district: District[] | null;
    districtLoaded: boolean;
  
}

const initialState: DistrictState = {
    district: null,
    districtLoaded: false,
  
};

export const fetchDistrict = createAsyncThunk(
  "district/fetchDistrict",
  async (_, thunkAPI) => {
    try {
      return await agent.District.listDistrict();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
// export const fetchOrderByIdAccount = createAsyncThunk<any, number>(
//     "order/fetchOrderByIdAccount",
//     async (idAccount, thunkAPI) => {
//       try {
//         return await agent.Order.getOrderAccountId(idAccount);
//       } catch (error: any) {
//         return thunkAPI.rejectWithValue({ error: error.data });
//       }
//     }
//   );

export const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {
    resetDistrict: (state) => {
      state.districtLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDistrict.fulfilled, (state, action) => {
      state.district = action.payload;
      state.districtLoaded = true;
    });
  },
});

export const { resetDistrict } = districtSlice.actions;
