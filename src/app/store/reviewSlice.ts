import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Review } from "../models/Review";

interface ReviewState {
    review : Review[] | null
    reviewLoaded : boolean
}

const initialState: ReviewState = {
    review: null,
    reviewLoaded: false
};

export const fetchReview = createAsyncThunk<any,number>(
    "review/fetchReview",
    async (idProduct, thunkAPI) => {
      try {
        return await agent.Review.getreview(idProduct);
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    },
  );


  export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchReview.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.review = action.payload.data;
            state.reviewLoaded = true
        });
    })
  });
  
  // eslint-disable-next-line no-empty-pattern
  export const {} = reviewSlice.actions;