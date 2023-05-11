import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import { Routes, Route } from "react-router-dom";
import HomePageU from "./components/public/PageUsers/HomePageU";
import HeaderUser from "./components/public/PageUsers/HeaderUser";
import HomeShopU from "./components/public/Shoppings/HomeShopU";
import CartU from "./components/public/CartUser/CartU";
import LoginU from "./components/public/LoginUser/LoginU";
import RegiterU from "./components/public/LoginUser/RegiterU";
import HomeOrderU from "./components/public/OrderUser/HomeOrderU";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/store/configureStore";
import { fetchAccount } from "./app/store/accountSlice";
import { PrivateLogin, PrivateRoute } from "./components/private/PrivateRoute/PrivateRoute";
import { fetchCartAsync } from "./app/store/cartSlice";
import PageAdmin from "./components/private/PageAdmin/PageAdmin";
import { setShowLayout } from "./app/store/homeSlice";
import useSiderPrivate from "./app/hooks/useSiderPrivate";
import { RoleInfo } from "./app/models/Role";

import PageProduct from "./components/private/PageProduct/PageProduct";
import UserProfile from "./components/public/UserProfile/UserProfile";
import UpdateProfile from "./components/public/UserProfile/UpdateProfile";
import PageUesr from "./components/private/PageUesr/PageUesr";
import FormProduct from "./components/private/PageProduct/FormProduct";
import useProfile from "./app/hooks/useProfile";
import FormUserinfo from "./components/public/UserProfile/FormUserinfo";
import InfoUser from "./components/public/UserProfile/InfoUser";
import ProductDetailPrivatePage from "./components/private/PageProduct/ProductDetailPrivatePage";
import Test from "./components/private/PageProduct/test";
import HomeDetaliUV2 from "./components/public/DetailsProduct/HomeDetaliUV2";
import AccountDetailPrivatePage from "./components/private/PageUesr/AccountDetailPrivatePage";
import AboutU from "./components/public/About/AboutU";
import PageOrder from "./components/private/PageOrder/PageOrder";
import HomeOrderHis from "./components/public/OrderHistory/HomeOrderHis";


function App() {
  const pathname = window.location.pathname;
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-empty-pattern
  const {  } = useSiderPrivate();
  // eslint-disable-next-line no-empty-pattern
  const {  } = useProfile();
  const { showLayout } = useAppSelector(state => state.home);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchAccount())
        .unwrap()
        .then(async (data:any) => {
          if (data) await dispatch(fetchCartAsync(data.id));
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    const obj = JSON.parse(JSON.stringify(location));
    const path = obj.pathname as string;
    if (!path.includes("/admin")) dispatch(setShowLayout(true));
    else dispatch(setShowLayout(false));
  }, [location, showLayout]);

  return (
    <div>
      {!pathname.includes("/admin") && <HeaderUser/>}
      
      <Routes>
        {/* <Route path="http://10.103.0.16/cs63/s18/PJEnd/" element={<HomePageU/>} /> */}
        <Route path="/" element={<HomePageU/>} />
        <Route
          path="/login"
          element={
            <PrivateLogin>
              <LoginU />
            </PrivateLogin>
          }
        />
        <Route
          path="/regiter"
          element={
            <PrivateLogin>
              <RegiterU />
            </PrivateLogin>
          }
        />
        <Route path="/userprofile/profile" element={<UserProfile />} />
        <Route path="/userprofile/formprofile" element={<FormUserinfo />} />
        <Route path="/userprofile/infoprofile" element={<InfoUser />} />
        <Route path="/userprofile/updateprofile" element={<UpdateProfile />} />
        <Route path="/userprofile/orderhistory" element={<HomeOrderHis />} />
        <Route path="/about" element={<AboutU />} />
        <Route path="/shopping" element={<HomeShopU />} />
        <Route path="/detailproductV2/:idProduct" element={<HomeDetaliUV2 />} />
        <Route path="/cart" element={<CartU />} />
        <Route path="/order" element={<HomeOrderU />} />
        
        {/* Admin Page */}
        <Route element={<PrivateRoute roles={[RoleInfo.admin]}/>} >
        <Route path="/admin/home" element={<PageAdmin />} />
        <Route path="/admin/listuser" element={<PageUesr />} />
        <Route path='/admin/account/detail/:id' element={<AccountDetailPrivatePage />} />
        <Route path="/admin/listproduct" element={<PageProduct />} />
        <Route path='/admin/product/detail/:idProduct' element={<ProductDetailPrivatePage />} />
        <Route path="/admin/formproduct" element={<FormProduct />} />
        <Route path="/admin/order" element={<PageOrder />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
