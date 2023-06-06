import {
  useAppDispatch,
} from "../../../app/store/configureStore";
import { useEffect } from "react";
import useDistrict from "../../../app/hooks/useDistrict";
import { fetchDistrict } from "../../../app/store/districtSlice";

function Catelog() {
  const dispatch = useAppDispatch();
  const { district, districtLoaded } = useDistrict();
  useEffect(() => {
    if (!districtLoaded) dispatch(fetchDistrict());
  }, [districtLoaded, dispatch]);

  return (
    <div>
      <br />
      <br />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 padding-right">
              <div className="features_items">
                <h2 className="title text-center">ประชาสัมพันธ์</h2>
                
                {district?.map((dtri: any) => {
                  return (
                    <>
                      <div className="col-sm-3 ">
                        <div className="product-image-wrapper">
                          <div
                            className="single-products"
                            style={{ height: "350px" }}
                          >
                            <div className="productinfo text-center">
                            <img src={dtri?.image}  style={{ height: "150px" }} alt="Random" />

                              <h4 style={{ fontWeight: "bold" }}>
                                ตำบล : {dtri?.name}
                              </h4>
                              <span>{dtri?.textDistrict}</span>
                              <br />
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                {/* {productNew?.map((pronew: Product) => {
                  return(
                    <div className="col-sm-3 ">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img
                            src={pronew.image }
                            
                            style={{ height: "200px" }}
                            alt=""
                          />
                          <h2>{pronew?.price} ฿</h2>
                          <h4 style={{fontWeight:"bold"}}>{pronew?.name}</h4>
                          <span>ตำบล : {pronew?.districtName}</span>
                          <br/>
                          <br/>
                        </div>
                        <img
                              src="src/assets/images/home/new.png"
                              className="new"
                              alt=""
                            />
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          
                          <li>
                            <Link to={`/detailproductV2/${pronew.id}`}>
                              <DensitySmallIcon /> ข้อมูลเพิ่มเติม
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  )
                })} */}

                {/* <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img
                          src="https://drive.google.com/uc?id=1Mgp7SUEyh8cDZoVJC_ii3dEk4P9QXk_d"
                          style={{ height: "200px" }}
                          alt=""
                        />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <a href="#">
                            <i className="fa fa-plus-square"></i>เพิ่มรายการโปรด
                          </a>
                        </li>
                        <li>
                          <Link to="/detailproduct">
                            <DensitySmallIcon /> รายละเอียด
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img
                          src="https://drive.google.com/uc?id=1Mgp7SUEyh8cDZoVJC_ii3dEk4P9QXk_d"
                          style={{ height: "200px" }}
                          alt=""
                        />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <a href="#">
                            <i className="fa fa-plus-square"></i>เพิ่มรายการโปรด
                          </a>
                        </li>
                        <li>
                          <Link to="/detailproduct">
                            <DensitySmallIcon /> รายละเอียด
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img
                          src="https://drive.google.com/uc?id=1CJIz-AQrocKIEJFFEiwarMGlZsv9FJlQ"
                          style={{ height: "200px" }}
                          alt=""
                        />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                      <img
                        src="src/assets/images/home/new.png"
                        className="new"
                        alt=""
                      />
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <a href="#">
                            <i className="fa fa-plus-square"></i>เพิ่มรายการโปรด
                          </a>
                        </li>
                        <li>
                          <Link to="/detailproduct">
                            <DensitySmallIcon />
                            รายละเอียด
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img
                          src="https://drive.google.com/uc?id=1GiSGPL_6lBy-R0bDIB7pPfsCEr5ZN0bJ"
                          style={{ height: "200px" }}
                          alt=""
                        />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a href="#" className="btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart"></i>Add to cart
                          </a>
                        </div>
                      </div>
                      <img
                        src="src/assets/images/home/sale.png"
                        className="new"
                        alt=""
                      />
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <a href="#">
                            <i className="fa fa-plus-square"></i>เพิ่มรายการโปรด
                          </a>
                        </li>
                        <li>
                          <Link to="/detailproduct">
                            <DensitySmallIcon />
                            รายละเอียด
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Catelog;
