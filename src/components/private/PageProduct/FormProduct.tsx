import { CloseOutlined } from "@ant-design/icons";
import {
  Badge,
  Card,
  Input,
  InputNumber,
  Select,
} from "antd";
import LayoutAdmin from "../PageAdmin/LayoutAdmin";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Form, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  fetchCategoryProductsAsync,
  fetchDistrictsAsync,
} from "../../../app/store/productSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import Swal from "sweetalert2";
import agent from "../../../app/api/agent";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductPrivateValidate } from "./ProductPrivateValidate";
import { beforeUploadAntd } from "../../../app/util/util";

const FormProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  
  const { state } = useLocation();
  const values = {
    id: state? state.id : "",
    name: state ? state.name : "",
    price: state ? state.price : "",
    stock: state ? state.stock : "",
    detailsinfo: state ? state.detailsinfo : "",
    
    categoryProductID: state ? state.categoryProductID : "",
    
    districtID: state ? state.districtID : "",
  };

  const { categoryProductLoaded, categoryProducts, districtLoaded, district } =
    useAppSelector((state) => state.product);

  useEffect(() => {
    if (!categoryProductLoaded) dispatch(fetchCategoryProductsAsync());
  }, [categoryProductLoaded, dispatch]);

  useEffect(() => {
    if (!districtLoaded) dispatch(fetchDistrictsAsync());
  }, [districtLoaded, dispatch]);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const submitForm = async (value: any) => {
    let result ;
    // result = await agent.Product.updateproduct(value);
    if (!state) result = await agent.Product.create(value);
    else result = await agent.Product.updateproduct(value);
    console.log(value)
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate(-1)),
        window.location.replace("/admin/listproduct");
  };

  return (
    <LayoutAdmin>
      <Formik
        initialValues={values}
        validationSchema={ProductPrivateValidate}
        onSubmit={async (values) => {
         
          submitForm(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          const props: UploadProps = {
            name: "formFiles",
            multiple: false,
            onChange: (info) => {
              if (info.file.status === "uploading") {
                setLoading(true);
                return;
              }
              getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
              });
              setFieldValue("formFiles", info.file.originFileObj);
            },
          };

          const RemoveImage = () => {
            setFieldValue("formFiles", "");
            setImageUrl("");
          };

          return (
            <div>
              <h3>แบบกรอกข้อมูลสินค้า</h3>
            
              <Form onFinish={handleSubmit} className="row g-3">
                <Card>
                  <div className="col-md-12">
                  <label htmlFor="inputPassword4" className="form-label">
                        ชื่อสินค้า
                      </label>
                      <Input
                        status={touched.name && errors.name ? "error" : ""}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="form-control"
                        id="inputPassword4"
                        placeholder=" "
                      />
                    </div>

                  <div className="col-md-6">
                    <label htmlFor="floatingSelect">ประเภท</label>

                    <div>
                      <Select
                        style={{ width: "100%" }}
                        defaultValue={values.categoryProductID}
                        status={
                          touched.categoryProductID && errors.categoryProductID
                            ? "error"
                            : ""
                        }
                        value={values.categoryProductID}
                        onChange={(data) => {
                          setFieldValue("categoryProductID", data);
                        }}
                        onBlur={handleBlur}
                        options={categoryProducts?.map((data) => {
                          return {
                            value: data.id,
                            label: data.name,
                          };
                        })}
                        
                      />
                      <ErrorMessage
                        name="categoryProductID"
                        component="div"
                        className="text-danger text-st"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      ตำบล
                    </label>
                    <div>
                      <Select
                        defaultValue={values.districtID}
                        style={{ width: "100%" }}
                        status={
                          touched.districtID && errors.districtID ? "error" : ""
                        }
                        value={values.districtID}
                        onChange={(data) => {
                          setFieldValue("districtID", data);
                        }}
                        onBlur={handleBlur}
                        options={district?.map((data) => {
                          return {
                            value: data.id,
                            label: data.name,
                          };
                        })}
                      />
                      <ErrorMessage
                        name="districtID"
                        component="div"
                        className="text-danger text-st"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                    ราคา
                    </label>
                    <InputNumber
                        addonAfter="บาท"
                        style={{ width: "100%" }}
                      
                        name="price"
                        min={0}
                        placeholder=" "
                        status={touched.price && errors.price ? "error" : ""}
                        onChange={(data) => setFieldValue("price", data)}
                        onBlur={handleBlur}
                        value={values.price}
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-danger text-st"
                      />
                    
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                    จำนวน
                    </label>
                    <InputNumber
                        addonAfter="ชิ้น"
                        style={{ width: "100%" }}
                        name="stock"
                        min={0}
                        status={touched.stock && errors.stock ? "error" : ""}
                        onChange={(data) => setFieldValue("stock", data)}
                        onBlur={handleBlur}
                        value={values.stock}
                      />
                      <ErrorMessage
                        name="stock"
                        component="div"
                        className="text-danger text-st"
                      />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      รายละเอียดสินค้า
                    </label>
                    <Input.TextArea
                      status={
                        touched.detailsinfo && errors.detailsinfo ? "error" : ""
                      }
                      name="detailsinfo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.detailsinfo}
                      style={{  width: "100%" }}
                      placeholder=" "
                    />
                    <ErrorMessage
                      name="detailsinfo"
                      component="div"
                      className="text-danger text-st"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="formFileMultiple" className="form-label">
                      รูปสินค้า
                      </label>
                      <Form.Item name="photos">
                      <Upload
                        {...props}
                        beforeUpload={beforeUploadAntd}
                        showUploadList={false}
                        accept=".png , .jpg"
                      >

                        
                        {!imageUrl ? (
                          state?.image ? (<>
                          <Button style={{ fontFamily: "Sriracha, cursive" }} loading={loading} icon={<UploadOutlined />}>
                      แก้ไขรูปภาพ
                    </Button>
                    <br/>
                            <Badge
                          >
                            <img
                              src={state?.image}
                              className="img-thumbnail"
                              alt="..."
                              style={{ width: "100%", height: "200px" ,marginTop:"10px" }}
                            />
                          </Badge> 
                          </>) : (
                            <>
                            <Button style={{ fontFamily: "Sriracha, cursive" }} loading={loading} icon={<UploadOutlined />}>
                            เพิ่มรูปภาพ
                          </Button>
                          </>
                          )
                        ) : (
                          <>
                          <Badge
                            count={
                              <Button
                                type="primary"
                                shape="circle"
                                htmlType="button"
                                danger
                                icon={<CloseOutlined />}
                                onClick={RemoveImage}
                                size="small"
                                style={{ marginLeft: "5px" }}
                              />
                            }
                          >
                            <img
                              src={imageUrl}
                              className="img-thumbnail"
                              alt="..."
                              style={{ width: "100%", height: "200px" }}
                            />
                          </Badge> 
                          </>
                        )}
                      </Upload>
                    </Form.Item>
                    </div>
                  </div>

                  <div className=" col-md-12">
                    <div>
                    <Button href="/admin/listproduct" type="primary" danger>
                      กลับ
                    </Button>
                    
                    <Button
                    htmlType="submit"
                    type="primary"
                    style={{ left: "0.5%" }}
                  >
                    บันทัก
                  </Button>
                    </div>
                  </div>
                </Card>
              </Form>
              
            
          </div>);
        }}
      </Formik>
    </LayoutAdmin>
  );
};

export default FormProduct;
