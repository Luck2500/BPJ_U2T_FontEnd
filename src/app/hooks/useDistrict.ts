import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchDistrict } from '../store/districtSlice';


const useDistrict = () => {
  const dispatch = useAppDispatch();
  const {district , districtLoaded} = useAppSelector((state)=> state.district)
  
  useEffect(() => {
    if (!districtLoaded) dispatch(fetchDistrict());
}, [districtLoaded, dispatch]);



  return {
    district,
    districtLoaded,
  }
}

export default useDistrict