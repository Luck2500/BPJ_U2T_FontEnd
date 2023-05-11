import { useAppDispatch } from './../store/configureStore';
import { useEffect } from 'react'

import { useAppSelector } from '../store/configureStore';
import { fetchAccountAll } from '../store/accountSlice';

const useAccount = () => {
    const dispatch = useAppDispatch();
    const {
        accountLoaded
    } = useAppSelector(state => state.account);//

    useEffect(() => {
        if (!accountLoaded) dispatch(fetchAccountAll());
    }, [accountLoaded, dispatch]);
}

export default useAccount