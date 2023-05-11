import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { DetailProductImage } from "../models/DetailProductImage";
import { Result } from "../models/Interfaces/IResponse";

interface DetailProductImageState {
    detailProductImage : DetailProductImage[] | null
    detailProductImageLoaded : boolean
}

const initialState: DetailProductImageState = {
    detailProductImage: null,
    detailProductImageLoaded: false
};

export const createDetailProductAsync = createAsyncThunk<Result, any>("detailProduct/createDetailProductAsync",
    async (values, thunkAPI) => {
        try {
            return await agent.DetailProductImage.create(values);
          
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
});

export const fetchImageProductsAsync = createAsyncThunk<DetailProductImage[], any>(
    'product/fetchImageProductsAsync',
    async (idProduct, thunkAPI) => {
        console.log(idProduct)
        try {
            const result = await agent.DetailProductImage.get(idProduct);
            const images = result.data;
            return images;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const detailProductImageSlice = createSlice({
    name: "detailProductImage",
    initialState,
    reducers: {
        resetImageProduct: (state) => {
        state.detailProductImage = null;
        state.detailProductImageLoaded = false;
    },},
    extraReducers: (builder => {
        builder.addCase(fetchImageProductsAsync.fulfilled, (state, action) => {
            state.detailProductImage = action.payload;
            state.detailProductImageLoaded = true;
        });
    
    })
  });
  
  export const {resetImageProduct} = detailProductImageSlice.actions;