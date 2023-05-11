import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchOrderByIdAccount, fetchOrderConfirm } from "../store/orderSlice";
import { loadAccountStorage } from "../store/accountSlice";


const useOrder = () => {
  const account = loadAccountStorage();
  const dispatch = useAppDispatch();
  const { order, orderLoaded, orderConfirm, orderConfirmLoaded } =
    useAppSelector((state) => state.order);
  useEffect(() => {
    if (!orderLoaded) dispatch(fetchOrderByIdAccount(account.id));
  }, [orderLoaded, dispatch]);

  useEffect(() => {
   dispatch(fetchOrderConfirm());
  }, [orderConfirmLoaded]);

  return {
    order,
    orderLoaded,
    orderConfirm,
    orderConfirmLoaded,
  };
};

export default useOrder;
