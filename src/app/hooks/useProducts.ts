import { useEffect } from 'react'
import { fetchCategoryProductsAsync,  fetchProduct,  fetchProductNew } from '../../app/store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const useProducts = () => {
    const dispatch = useAppDispatch();
    const {product , detailProduct} = useAppSelector((state)=> state.product)
    const {
        productNew,
        productsNewLoaded,
        productsLoaded,
        metaData,
        districtLoaded,
        district,
        categoryProductLoaded,
        categoryProducts,
    } = useAppSelector(state => state.product);//


    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProduct());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!productsNewLoaded) dispatch(fetchProductNew());
    }, [productsNewLoaded, dispatch]);

    useEffect(() => {
        if (!categoryProductLoaded) dispatch(fetchCategoryProductsAsync());
    }, [categoryProductLoaded, dispatch]);


    return {
        metaData,
        productsLoaded,
        districtLoaded,
        productsNewLoaded,
        productNew,
        district,
        categoryProductLoaded,
        categoryProducts,
        product,
        detailProduct,
    };
}

export default useProducts