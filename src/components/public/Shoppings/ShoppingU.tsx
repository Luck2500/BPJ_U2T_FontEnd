import  { useEffect } from "react";
import CategoryU from "../PageUsers/CategoryU";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchProduct, setParams } from "../../../app/store/productSlice";




const ShoppingU = () => {
  const dispatch = useAppDispatch();
  const { productsLoaded, product } = useAppSelector((state) => state.product);
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProduct());
  }, [productsLoaded, dispatch]);
  
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <CategoryU />
            <div className="col-sm-9 padding-right">
              <div className="features_items">
                <h2 className="title text-center">รายการสินค้า</h2>
                <div className="col-sm-12">
                  <div className="search_box ">
                    <input  type="text" onChange={(e) => {
                       dispatch(setParams({  searchName : e.target.value }));
                    }} placeholder="ค้นหาสินค้า" />
                  </div>
                </div>
                <br />
                <br />
                <br />
                {product?.map((products:any) => {
                  return (
                    <>
                      <div className="col-sm-4">
                        <div className="product-image-wrapper">
                          <div className="single-products">
                            <div className="productinfo text-center">
                              <img
                                src={products.image}
                                style={{ height: "200px" }}
                                alt=""
                                className=""
                              />
                              <h2>{products.price} ฿</h2>
                              <h4 style={{fontWeight:"bold"}}>{products.name}</h4>
                              <span>ตำบล : {products?.districtName}</span>
                              <br />
                              <br />
                            </div>
                            
                            
                          </div>
                          <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                              <li>
                                <Link to={`/detailproductV2/${products.id}`}>
                                  <BiDetail
                                    style={{
                                      paddingTop: "2px",
                                      fontSize: "12px",
                                    }}
                                  />{" "}
                                  รายละเอียด
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

                
              </div>
              {/* <ul className="pagination">
                <li className="active">
                  <a href="">1</a>
                </li>
                <li>
                  <a href="">2</a>
                </li>
                <li>
                  <a href="">3</a>
                </li>
                <li>
                  <a href="">&raquo;</a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </section>
      {/* <FooterU /> */}
    </>
  );
};

export default ShoppingU;
