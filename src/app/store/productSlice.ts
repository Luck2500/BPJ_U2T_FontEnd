import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../api/agent";
import { CategoryProduct, District } from "../models/Cart";
import { MetaData } from "../models/Pagination";
import { Product, ProductParams } from "../models/Product";
import { RootState } from "./configureStore";

interface ProductState {
  product: Product[] | null;
  productNew: Product[] | null;
  productsLoaded: boolean;
  productsNewLoaded: boolean;
  detailProduct: Product | null;
  productsdetailLoaded: boolean;
  productParams: ProductParams;
  categoryProductLoaded: boolean;
  categoryProducts: CategoryProduct[] | null;
  districtLoaded: boolean;
  district: District[] | null;
  metaData: MetaData | null;
}


export const removeProductAsync = createAsyncThunk<any, string>("product/removeProductAsync", async (productId, thunkAPI) => {
  try {
      const results = await agent.Product.removeproduct(productId);
      return results;
  } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
  }
});

export const fetchProduct = createAsyncThunk<any , void , {state : RootState}>(
  "product/fetchProduct",
  async (_, thunkAPI) => {
    const params = thunkAPI.getState().product.productParams;
    try {
      return await agent.Product.getproduct(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProductNew = createAsyncThunk<any>(
  "product/fetchProductNew",
  async (_, thunkAPI) => {
    try {
      return await agent.Product.getproductNew();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCategoryProductsAsync = createAsyncThunk(
  "product/fetchCategoryProduct",
  async (_, thunkAPI) => {
    try {
      const result = await agent.CategoryProduct.list();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchDistrictsAsync = createAsyncThunk(
  "product/fetchDistricts",
  async (_, thunkAPI) => {
    try {
      const result = await agent.District.listDistrict();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchDetailProduct = createAsyncThunk<any, number>(
  "product/fetchDetailProduct",
  async (id, thunkAPI) => {
    console.log(id)
    try {
      return await agent.Product.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const createProductAsync = createAsyncThunk<any, any>(
  "product/createProductAsync",
  async (product, thunkAPI) => {
    try {
      const results = await agent.Product.create(product);
      return results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

const initParams = (): ProductParams => {
  return {
      pageNumber: 1,
      pageSize: 9,
      searchDistrict : "" ,
      searchCategory : '' ,
      searchName : ""
  }
};

const productsAdapter = createEntityAdapter<Product>(); // สรา้งตัวแปรแบบ Adapter

export const productSlice = createSlice({
  name: "product",
  initialState: productsAdapter.getInitialState<ProductState>({
    product: null,
    productNew: null,
    productsLoaded: false,
    productsNewLoaded: false,
    productParams: initParams(),
    detailProduct: null,
    productsdetailLoaded: false,
    categoryProductLoaded: false,
    categoryProducts: null,
    districtLoaded: false,
    district: null,
    metaData: null,
}),
  reducers: {
    resetDetailProduct: (state) => {
      state.productsdetailLoaded = false;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
  },
    setParams: (state, action) => {
      state.productsLoaded = false; // เพื่อ Product มัน reload ใหม่
      state.productParams = { ...state.productParams, ...action.payload };
  },
  },
  extraReducers: (builder) => {
    
       
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.product = action.payload.data;
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductNew.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.productNew = action.payload.data;
      state.productsNewLoaded = true;
    });
    builder.addCase(fetchDetailProduct.fulfilled, (state, action) => {
      if (action.payload.msg === "OK")
        productsAdapter.upsertOne(state, action.payload)
        state.detailProduct = action.payload.data;
      state.productsdetailLoaded = true;
    });
    builder.addCase(fetchCategoryProductsAsync.fulfilled, (state, action) => {
      state.categoryProducts = action.payload;
      state.categoryProductLoaded = true;
    });
    builder.addCase(fetchDistrictsAsync.fulfilled, (state, action) => {
      state.district = action.payload;
      state.districtLoaded = true;
    });
  },
});

export const { setMetaData, setParams, resetDetailProduct } = productSlice.actions;

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product); 