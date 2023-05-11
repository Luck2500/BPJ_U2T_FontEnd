import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchReport } from "../store/reportSlice";



const useReport = () => {
    const dispatch = useAppDispatch();
    const {
        
        datareport,
        datareportLoaded
    } = useAppSelector(state => state.report);//

    

    useEffect(() => {
         dispatch(fetchReport());
    }, [datareportLoaded, dispatch]);

    return {
        datareport,
        datareportLoaded
      };
}

export default useReport