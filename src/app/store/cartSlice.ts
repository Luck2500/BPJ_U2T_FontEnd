import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Cart } from "../models/Cart";

interface CartState {
  carts: Cart[] | null;
  status: string;
  catorder : Cart | null
}

const initialState: CartState = {
  carts: null,
  status: "",
  catorder: null
};

export const fetchCartAsync = createAsyncThunk<Cart[], any>(
  "cart/fetchCartAsync",
  async (accountId, thunkAPI) => {
    try {
      const result = await agent.Cart.getcartlist(accountId);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCartOrderAsync = createAsyncThunk<Cart, any>(
  "cart/fetchCartOrderAsync",
  async (accountId, thunkAPI) => {
    try {
      const result = await agent.Cart.getcartlist(accountId);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const addCartItemAsync = createAsyncThunk<
  Cart,
  { productId: string; accountId: string; amount: number }
>(
  "cart/addCartItemAsync",
  async ({ productId, accountId, amount }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("AccountID", accountId);
      formData.append("ProductID", productId);
      formData.append("AmountProduct", amount.toString());
      const  result  = await agent.Cart.addcart(formData);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeCartItemAsync = createAsyncThunk<void, { productId: string, accountId?: string, amount?: number, name?: string }>("cart/removeCartItemAsync",
    async ({ productId, accountId, amount }, thunkAPI) => {
        try {
            return await agent.Cart.removecart({ productId, accountId, amount });
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const updateCartAsync = createAsyncThunk<Cart, any>(
  "cart/updateCartAsync",
  async ({ data, amountProduct, idAccount }, thunkAPI) => {
    try {
      // console.log(data)
      const formData = new FormData();
      formData.append("ID", data.id);
      formData.append("AccountID", idAccount);
      formData.append("ProductID", data.product.id);
      formData.append("AmountProduct", amountProduct);
      const { result } = await agent.Cart.updatecart(formData);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.carts = action.payload;
    },
    clearCart: (state) => {
      state.carts = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { amount } = action.meta.arg; // ค่าที่ส่งมา
      const itemIndex = state.carts?.findIndex(i => i.product.id === i.product.id);
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.carts![itemIndex].amountProduct -= Number(amount);
      if (state.carts![itemIndex].amountProduct === 0)
          state.carts!.splice(itemIndex, 1);
      state.status = 'idle';
  });
  builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
  });
  builder.addCase(removeCartItemAsync.rejected, (state) => {
      state.status = 'idle';
  });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.carts = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchCartOrderAsync.fulfilled, (state, action) => {
      state.catorder = action.payload;
      state.status = "idle";
    });
    builder.addMatcher(isAnyOf(addCartItemAsync.rejected, fetchCartAsync.rejected), (state) => {
      state.status = 'idle';
  });
  },
  
});

export const { setCart, clearCart } = cartSlice.actions;
