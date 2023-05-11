/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from './accountSlice';
import { cartSlice } from './cartSlice';
import { detailProductImageSlice } from './detailProductImage';
import { homeSlice } from './homeSlice';
import { productDetailProcessSlice } from './ProductDetailProcess';
import { productSlice } from './productSlice';
import { reviewSlice } from './reviewSlice';
import { orderSlice } from './orderSlice';
import { districtSlice } from './districtSlice';
import { reportSlice } from './reportSlice';


export const store = configureStore({
    reducer: {
        account : accountSlice.reducer,
        product : productSlice.reducer,
        cart : cartSlice.reducer,
        home : homeSlice.reducer ,
        review : reviewSlice.reducer,
        productDetailProcess: productDetailProcessSlice.reducer,
        detailProductImage: detailProductImageSlice.reducer,
        district: districtSlice.reducer,
        order: orderSlice.reducer,
        report: reportSlice.reducer
    },
  });


//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>// อ่าน state ; ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

//สำหรับเรียกใข้ dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = ()=>useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;