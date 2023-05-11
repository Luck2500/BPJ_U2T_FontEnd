import { useEffect } from 'react';
import {  fetchCartOrderAsync } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
const useCart = () => {
  const dispatch = useAppDispatch()
  const {account } = useAppSelector(state => state.account);
    const { catorder, carts, status } = useAppSelector(state => state.cart);
    const subtotal = carts?.reduce((sum, item) => sum + (item.amountProduct * item.product.price), 0) ?? 0;
    const itemCount = carts?.reduce((sum, item) => sum + item.amountProduct, 0) ?? 0;
    const deliveryFree = subtotal > 10000 ? 0 : 50;

    useEffect(() => {
     if(!catorder) dispatch(fetchCartOrderAsync(account?.id));
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {
      
    }, [carts]);
  return {
    carts ,
    catorder,
    status ,
    deliveryFree ,
    subtotal ,
    itemCount
  };
}

export default useCart