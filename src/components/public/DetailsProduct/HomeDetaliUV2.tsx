import { Button, Card, Descriptions, Image, Input } from "antd";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../app/hooks/useCart";
import useProductDetailProcess from "../../../app/hooks/useProductDetailProcess";
import useProducts from "../../../app/hooks/useProducts";
import { addCartItemAsync, fetchCartAsync } from "../../../app/store/cartSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchProductDetailProcessByIdProductAsync,
  reSetDetailProduct,
} from "../../../app/store/ProductDetailProcess";
import { fetchDetailProduct } from "../../../app/store/productSlice";
import { fetchReview } from "../../../app/store/reviewSlice";
import { Form, Formik } from "formik";
import agent from "../../../app/api/agent";
import { loadAccountStorage } from "../../../app/store/accountSlice";
import usedetailProduct from "../../../app/hooks/useDetailProductImage";
import Slider from "react-slick";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { Typography } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

function HomeDetaliUV2() {
  const { idProduct } = useParams<{ idProduct: any }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { detailProduct } = useProducts();
  const { carts } = useCart();
  const account = loadAccountStorage();
  // const [images, setImages] = useState<IImageGallery[] | any>([]);
  const [amount, setAmount] = useState<number | any>(0); // จำนวนสินค้าที่เราจะเพิ่มใส่ตะกร้า
  const { productDetailProcess, productDetailProcessLoaded } =
    useProductDetailProcess();
  const { Text } = Typography;
  const { detailProductImage } = usedetailProduct();
  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };
  const proimage = detailProductImage?.map((deta) => {
    return (
      <div>
        <Image src={deta?.image} height={320} />
      </div>
    );
  });

  const item = carts?.find((i) => i.product.id);

  const values = {
    productID: idProduct,
    text: "",
    accountID: account?.id,
    formFiles: "",
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  useEffect(() => {
    if (productDetailProcessLoaded)
      dispatch(fetchProductDetailProcessByIdProductAsync(idProduct));
    dispatch(fetchReview(idProduct));
    return () => {
      dispatch(reSetDetailProduct());
    };
  }, [productDetailProcessLoaded, dispatch]);

  const { review } = useAppSelector((state) => state.review);
  const AddCart = async (accountId: any, productId: any, amount: any) => {
    if ((account?.id !== 0, amount !== 0)) {
      const result: any = await dispatch(
        addCartItemAsync({
          accountId: accountId,
          productId: productId,
          amount: amount,
        })
      ).unwrap();
      if (result.msg === "OK") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่มสินค้าเรียบร้อย",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          // window.location.replace(`/detailproduct/${idProduct}`)
        });
      }
    } else {
      Swal.fire("กรุณาเพิ่มตระกร้าสินค้า", "", "warning");
    }
  };

  useEffect(() => {
    if (!item) setAmount(amount);
    dispatch(fetchDetailProduct(idProduct));
  }, [detailProduct, item, idProduct, dispatch]);

  useEffect(() => {
    dispatch(fetchCartAsync(account?.id));
  }, [carts]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setAmount(parseInt(event.target.value));
      if (Number(amount) < Number(detailProduct?.stock))
        setAmount(idProduct?.stock);
    }
  };

  const handleSubmitForm = async (value: any) => {
    let result;
    // eslint-disable-next-line prefer-const
    result = await agent.Review.addreview(value);
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => dispatch(fetchReview(idProduct)));
    else {
      Swal.fire({
        position: "center",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        icon: "error",
      });
    }
  };

  const reviewtest = review?.map((rw: any) => {
    return (
      <>
        <div className="col-sm-12">
          <ul style={{ marginTop: "20px" }}>
            <li>
              <Link to="#">
                <Person2RoundedIcon style={{ fontSize: "18px" }} />
                {rw.account?.name}
              </Link>
            </li>{" "}
            <li>
              <Link to="#">
                <CalendarOutlined style={{ marginRight: "5px" }} />
                {moment.utc(rw.created).format("DD/MM/YYYY")}
              </Link>
            </li>
            <li>
              <Link to="#">
                <ClockCircleOutlined style={{ marginRight: "5px" }} />
                {moment.utc(rw.created).format("HH:mm:ss")}
              </Link>
            </li>
          </ul>
          <Text
            style={{
              fontFamily: "Sriracha, cursive",
            }}
          >
            <p>{rw.text}</p>
          </Text>
          <hr />
        </div>
      </>
    );
  });
  const amountChange = (data = 1, key: string) => {
    if (data > 0) {
      switch (key) {
        case "add":
          if (Number(amount) < Number(detailProduct?.stock)) {
            setAmount(amount + Number(data));
          }
          break;
        case "remove":
          if (amount > 0) {
            setAmount(amount - Number(data));
          }
          break;
      }
    }
  };

  const infoDetailProduct = [
    {
      title: "วิดีโอ",
      info: (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            fontFamily: "Sriracha, cursive",
          }}
          key={productDetailProcess?.id}
        >
          {productDetailProcess?.videoProduct !== "" ? (
            <video controls width="100%">
              <source
                src={productDetailProcess?.videoProduct}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              width="100%"
              src="https://www.thejungleadventure.com/assets/images/logo/novideo.png"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="col-sm-12 padding-right">
        <div className="container">
          <div className="product-details">
            <div className="col-sm-4">
              <div className="view-product">
                <Card>
                  <Slider {...settings} autoplay>
                    <div>
                      <Image src={detailProduct?.image} alt="" height={320} />
                    </div>
                    {proimage}
                  </Slider>
                  {/* <Image src={detailProduct?.image} alt="" height={320} /> */}
                </Card>
              </div>

              <div
                id="similar-product"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="item active">
                    <a href="">
                      {/* <img
                        src="https://th-live-01.slatic.net/p/e9779da394a406208c68a3f821729b7c.png"
                        alt=""
                      /> */}
                    </a>
                  </div>
                  <div className="item">
                    <a href="">
                      {/* <img src="images/product-details/similar1.jpg" alt="" /> */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="product-information">
                <h2>สินค้า: {detailProduct?.name}</h2>
                <p>รหัสสินค้า : {detailProduct?.id}</p>

                <span>
                  <span>THB {detailProduct?.price} บาท</span>
                </span>
                <p>
                  <b>จำนวน : </b>
                  <Button onClick={() => amountChange(1, "remove")}>
                    <MinusOutlined style={{ margin: "2px" }} />
                  </Button>
                  <Input
                    onChange={handleInputChange}
                    style={{
                      fontSize: "22px",
                      fontFamily: "Sriracha, cursive",
                      marginLeft: "5px",
                      width: "50px",
                      height: "37.5px",
                    }}
                    min={1}
                    max={detailProduct?.stock}
                    value={amount}
                  />
                  <Button
                    style={{ marginLeft: "5px" }}
                    onClick={() => amountChange(1, "add")}
                  >
                    <PlusOutlined style={{ margin: "2px" }} />
                  </Button>
                  {account ? (
                    <>
                      <button
                        type="button"
                        disabled={!item && amount === 0}
                        onClick={() =>
                          AddCart(account?.id, detailProduct?.id, amount)
                        }
                        className="btn btn-fefault cart"
                      >
                        <ShoppingCartOutlined style={{ margin: "2px" }} />{" "}
                        หยิบใส่ตะกร้า
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={!item && amount === 0}
                        onClick={() =>
                          Swal.fire({
                            title: "กรุณาเข้าสู่ระบบ!",
                            icon: "warning",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",

                            confirmButtonText: "เข้าสู่ระบบ",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate("/login");
                            }
                          })
                        }
                        className="btn btn-fefault cart"
                      >
                        <ShoppingCartOutlined style={{ margin: "2px" }} />{" "}
                        หยิบใส่ตะกร้า
                      </button>
                    </>
                  )}
                </p>
                <p>
                  <b>ประเภท :</b> {detailProduct?.categoryName}
                </p>
                <p>
                  <b>สินค้าคงเหลือ :</b> {detailProduct?.stock}
                </p>
                <p>
                  <b>ตำบล :</b> {detailProduct?.districtName}
                </p>
              </div>
            </div>
          </div>

          <div className="category-tab shop-details-tab">
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a href="#details" data-toggle="tab">
                    รายละเอียด
                  </a>
                </li>
                <li>
                  <a href="#reviewsII" data-toggle="tab">
                    แสดงความคิดเห็น
                  </a>
                </li>
                {/* <li >
                  <a href="#reviews" data-toggle="tab">
                    เพิ่มความคิดเห็น
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active in" id="details">
                <div className="bg">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="contact-form">
                        <div
                          className="status alert alert-success"
                          style={{ display: "none" }}
                        ></div>

                        <div className="form-group col-md-12">
                          <Card style={{ margin: "4px" }}>
                            {productDetailProcess &&
                              React.Children.toArray(
                                infoDetailProduct.map(({ info, title }) => (
                                  <>
                                    <div className="form-group col-md-12">
                                      <Descriptions.Item
                                        labelStyle={{ fontWeight: "bold" }}
                                        label={title}
                                      >
                                        {info}
                                      </Descriptions.Item>
                                    </div>

                                    <p
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontFamily: "Sriracha, cursive",
                                        }}
                                      >
                                        วัตถุการทำผลิตภัณฑ์:{" "}
                                        {productDetailProcess.nameRawMaterial}
                                      </Text>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "justify",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontFamily: "Sriracha, cursive",
                                        }}
                                      >
                                        วิธีทำผลิตภัณฑ์:{" "}
                                        {
                                          productDetailProcess.makeProductsprocess
                                        }
                                      </Text>
                                    </p>
                                  </>
                                ))
                              )}
                          </Card>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="contact-info">
                        <Card style={{ margin: "4px" }}>
                          <p style={{ fontSize: "14px", textAlign: "justify" }}>
                            <Text style={{ fontFamily: "Sriracha, cursive" }}>
                              รายละเอียดสินค้า: {detailProduct?.detailsinfo}
                            </Text>
                          </p>
                        </Card>

                        <div className="form-group col-md-11"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane " id="reviewsII">
                <div className="col-sm-12">
                  <Formik
                    initialValues={values}
                    onSubmit={async (values) => {
                      await new Promise((r) => setTimeout(r, 500));
                      console.log(values);
                      handleSubmitForm(values);
                    }}
                  >
                    {({ values, handleChange, handleBlur, handleSubmit }) => {
                      return (
                        <>
                          {account ? (
                            <Card>
                              <Form onSubmit={handleSubmit}>
                                <span>
                                  <Person2RoundedIcon
                                    style={{ fontSize: "18px" }}
                                  />{" "}
                                  {account?.name}
                                </span>
                                <textarea
                                  style={{ backgroundColor: "#f9f9f9" }}
                                  className="form-control ml-1 shadow-none textarea"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="text"
                                  value={values.text}
                                  placeholder="เเสดงความคิดเห็น"
                                ></textarea>
                                {/* <button className="btn gradient-btn">ตกลง</button> */}
                                <button className="btn btn-default pull-right">
                                  ส่ง
                                </button>
                              </Form>
                            </Card>
                          ) : (
                            <>
                              <div style={{ textAlign: "center" }}>
                                <h5>เข้าสู่ระบบเพื่อแสดงความคิดเห็น</h5>
                                <Button
                                  onClick={() => {
                                    navigate("/login");
                                  }}
                                >
                                  เข้าสู่ระบบ
                                </Button>
                              </div>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Formik>
                  {/* <form action="#">
                    <span>
                    <i className="fa fa-user"></i>
                    </span>
                    <textarea name=""></textarea>
                    <button
                      type="button"
                      className="btn btn-default pull-right"
                    >
                      Submit
                    </button>
                  </form> */}
                </div>

                {reviewtest}
              </div>

              <div className="tab-pane fade " id="reviews"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDetaliUV2;
