import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchProductDetailProcessByIdProductAsync } from '../store/ProductDetailProcess';

const useProductDetailProcess = () => {
    const { idProduct } = useParams<{ idProduct: any }>();
    const dispatch = useAppDispatch();
    const {productDetailProcess , productDetailProcessLoaded} = useAppSelector((state)=> state.productDetailProcess)
    useEffect(() => {
        if (!productDetailProcessLoaded) dispatch(fetchProductDetailProcessByIdProductAsync(idProduct));
    }, [productDetailProcessLoaded, dispatch]);
    
  return {
    productDetailProcessLoaded,
    productDetailProcess
  }
}

export default useProductDetailProcess