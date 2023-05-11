import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { DataProductDetailProcess } from "../models/ProductDetailProcess";
import { RootState } from "./configureStore";

interface DetailProductState {
  productDetailProcess: DataProductDetailProcess | null;
  productDetailProcessLoaded: boolean;
}

// const initialState: DetailProductState = {
//   productDetailProcess: null,
//   productDetailProcessLoaded: false,
// };

export const createDataProductDetailProcessAsync = createAsyncThunk<Result,any>(
  "productDetailProcess/createProductDetailProcessAsync",
  async (value, thunkAPI) => {
    try {
      return await agent.ProductDetailProcess.addProductDetailProcess(value);
      
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

// export const updateProductDetailProcessAsync = createAsyncThunk<Result, any>("productDetailProcess/updateProductDetailProcessAsync",
//     async (value, thunkAPI) => {
//         try {
//             return await agent.DetailProduct.update(value);
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({ error: error.data })
//         }
//     });


export const deleteDetailProductAsync = createAsyncThunk<any, any>("detailProduct/deleteDetailProductAsync",
    async (idProduct, thunkAPI) => {
        try {
            const result = await agent.ProductDetailProcess.deleteProductDetailProcess(idProduct);
            return result ;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchProductDetailProcessByIdProductAsync = createAsyncThunk<any,number>(
  "productDetailProcess/fetchProductDetailProcessByIdProductAsync",
  async (idProduct, thunkAPI) => {
    try {
      return await agent.ProductDetailProcess.getProductDetailProcessByIDProduct(idProduct);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const productDetailProcessAdapter = createEntityAdapter<DataProductDetailProcess>(); // สรา้งตัวแปรแบบ Adapter

export const productDetailProcessSlice = createSlice({
  name: "productDetailProcess",
  initialState: productDetailProcessAdapter.getInitialState<DetailProductState>({
    productDetailProcess: null,
    productDetailProcessLoaded: false,
  
}),
  reducers: {
    reSetDetailProduct: (state) => {
      state.productDetailProcess = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchProductDetailProcessByIdProductAsync.fulfilled,(state, action) => {
        if (action.payload.msg === "OK")
          productDetailProcessAdapter.upsertOne(state, action.payload)
          state.productDetailProcess = action.payload.data;
        state.productDetailProcessLoaded = true;
      }
    );
    builder.addMatcher(isAnyOf(deleteDetailProductAsync.fulfilled ), (state, action) => {
      state.productDetailProcess = action.payload
      state.productDetailProcessLoaded = false;
  });
  },
});

export const { reSetDetailProduct } = productDetailProcessSlice.actions;

export const productDetailProcessSelectors = productDetailProcessAdapter.getSelectors((state: RootState) => state.productDetailProcess); 