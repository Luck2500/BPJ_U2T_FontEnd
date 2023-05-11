import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConfirmOrder, Order } from "../models/Order";
import agent from "../api/agent";

interface OrderState {
  order: Order[] | null;
  orderLoaded: boolean;
  orderConfirm: ConfirmOrder[] | null
  orderConfirmLoaded: boolean;
}

const initialState: OrderState = {
  order: null,
  orderLoaded: false,
  orderConfirm: null,
  orderConfirmLoaded: false
};

export const fetchOrderByIdAccount = createAsyncThunk<any, number>(
  "order/fetchOrderByIdAccount",
  async (idAccount, thunkAPI) => {
    try {
      return await agent.Order.getOrderAccountId(idAccount);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchOrderConfirm = createAsyncThunk(
  "product/fetchOrderConfirm",
  async (_, thunkAPI) => {
    try {
      const result = await agent.Order.getconfirm();
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);



export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderLoaded = false;
    },
    resetOrderConfirm: (state) => {
      state.orderConfirmLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderByIdAccount.fulfilled, (state, action) => {
      state.order = action.payload;
      state.orderLoaded = true;
    });
    builder.addCase(fetchOrderConfirm.fulfilled, (state, action) => {
      state.orderConfirm = action.payload.data;
      state.orderConfirmLoaded = true;
    });
  },
});

export const { resetOrder } = orderSlice.actions;
