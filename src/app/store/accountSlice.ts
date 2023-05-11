import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Account, Login } from "../models/Account";
import { Result } from "../models/Interfaces/IResponse";
import { Role } from "../models/Role";
import { setCart } from "./cartSlice";
interface AccountState {
  account: Account | null;
  accountLoaded: boolean;
  accountAllLoaded: boolean;
  accountAll: Account[] | null;
  roleData: Role[] | null;
  token: string | null;
}

const initialState: AccountState = {
  account: null,
  accountLoaded: false,
  roleData: null,
  token: null,
  accountAllLoaded: false,
  accountAll: null
};

export interface setUpAccount {
  account: Account;
  token: string;
}

export const loadAccountStorage = () =>
  JSON.parse(localStorage.getItem("account")!);

export const loginAccount = createAsyncThunk<any, Login>(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("Email", data.email);
      formData.append("Password", data.password);
      const result = await agent.Account.login(formData);
      const { ...payload } = result;
      if (payload.result) {
        const token = payload.result.token;
        const account = payload.result.account;
        const cart = payload.result.cart;
        thunkAPI.dispatch(setCart(cart));
        thunkAPI.dispatch(
          setTingAccount({ account: account, token: token } as setUpAccount)
        );
      }
      localStorage.setItem("account", JSON.stringify(result.data));
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchRolesAsync = createAsyncThunk<any>(
  "account/fetchRoles",
  async (id, thunkAPI) => {
    
    try {
      const { result }: Result = await agent.Role.roleById(id);
      thunkAPI.dispatch(setRoleData(result));
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchAccountAll = createAsyncThunk<Account[]>(
  "account/fetchAccountAll",
  async (_, thunkAPI) => {
    try {
      const result = await agent.Account.getAccountAll();
      
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("account")) return false;
    },
  }
);

export const fetchAccount = createAsyncThunk<Account>(
  "account/fetchAccount",
  async (_, thunkAPI) => {
    const account = loadAccountStorage();
    thunkAPI.dispatch(setAccount(account));
    try {
      const data = await agent.Account.getAccountId(account.id);
      localStorage.setItem(
        "account",
        JSON.stringify({ ...account, account: data })
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("account")) return false;
    },
  }
);

export const updateAccountAsync = createAsyncThunk<Account,any>("account/updateAccountAsync",
    async (data, thunkAPI) => {
      const account = loadAccountStorage();
           try {
       const result = await agent.Account.update(data,account.id);
       return result;
    } catch (error: any) {
       return thunkAPI.rejectWithValue({ error: error.data });
     }
    }
);


export const registerAccount = createAsyncThunk<any, any>(
  "account/register",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Email", data.email);
      formData.append("Password", data.password);
      formData.append("PhoneNumber", data.phoneNumber);
      formData.append("Address", data.address);
      formData.append("FormFiles", data.filefrom);
      formData.append("RoleID", "1");
      const result = await agent.Account.register(formData);
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRoleData: (state, action) => {
      state.roleData = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload.account;
      if (action.payload.token) state.token = action.payload.token;
    },
    setTingAccount: (_, action) => {
      const { account, token } = action.payload;
      localStorage.setItem(
        "account",
        JSON.stringify({
          account: account,
          token: token,
        })
      );
    },
    logout: (state) => {
      state.token = null;
      state.account = null;
      localStorage.removeItem("account");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      if (action.payload.result) {
        state.account = action.payload.result.account;
        state.token = action.payload.result.token;
      }
    });
    builder.addCase(fetchAccountAll.fulfilled, (state, action) => {
      state.accountAllLoaded = true;
      state.accountAll =action.payload;
    });
    
  },
});

export const { setRoleData, setTingAccount, setAccount, logout } =
  accountSlice.actions;
