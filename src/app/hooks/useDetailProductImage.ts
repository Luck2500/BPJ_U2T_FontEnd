import { useEffect } from "react";

import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchImageProductsAsync, resetImageProduct } from "../store/detailProductImage";

const usedetailProduct = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useAppDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { idProduct } = useParams<{ idProduct: any }>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { detailProductImage, detailProductImageLoaded } = useAppSelector(state => state.detailProductImage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!detailProductImage)dispatch(fetchImageProductsAsync(idProduct));
         return () => {
           if (detailProductImage) dispatch(resetImageProduct());
         };
 
       }, [detailProductImageLoaded, dispatch,idProduct,detailProductImage]);

    
    return {
        detailProductImage,
        detailProductImageLoaded
    };
   
  }
  
  export default usedetailProduct