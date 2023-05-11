import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./Regiter.css";
import { ErrorMessage, Form, Formik } from "formik";
import { Badge, Button, Input, message } from "antd";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { RiUser3Line } from "react-icons/ri"
import { MdEmail } from "react-icons/md"
import { CloseOutlined, UploadOutlined } from "@mui/icons-material";
import { BsFillTelephoneFill } from "react-icons/bs"
import {BiLockAlt} from "react-icons/bi"
import { useAppDispatch } from "../../../app/store/configureStore";
import { registerAccount } from "../../../app/store/accountSlice";
const values = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  filefrom: File,
  address: "",
};

function RegiterU() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const RemoveImage = () => setImageUrl("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitForm = async (data: any) => {
    const result = await dispatch(registerAccount(data)).unwrap();
    if (result.msg === "OK") {
      swal({
        title: "สมัครสำเร็จ",
        icon: "success",
        buttons: [false, "ตกลง"],
      }).then(() => navigate("/login"));
    } else {
      swal({
        title: "อีเมล์ซ้ำ",
        icon: "warning",
        buttons: [false, "ตกลง"],
      });
    }
  };
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!");
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error("รูปภาพต้องมีขนาดเล็กกว่า 100MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <>
    <Formik
      initialValues={values}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
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
        const handleChangeImaage: UploadProps["onChange"] = (
          info: UploadChangeParam<UploadFile>
        ) => {
          if (info.file.status === "uploading") {
            setLoading(true);
            return;
          }
          getBase64(info.file.originFileObj as RcFile, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
          setFieldValue("filefrom", info.file.originFileObj);
        };
        return (
          <div className="bodyB ">
            <div className="bg_img"></div>
            <div className="form_wrapper">
              <div className="form_container">
                <div className="title_container">
                  <h2>ลงทะเบียนเข้าสู่ระบบ</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="row_half">
                      <label>ชื่อผู้ใช้</label>
                      <div className="">
                        {" "}
                        <Input
                          style={{ fontFamily: "Sriracha, cursive" }}
                          type="text"
                          size="large"
                          status={touched.name && errors.name ? "error" : ""}
                          prefix={<RiUser3Line/>}
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          // required
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div>
                        <label>อีเมล</label>
                        <div className="">
                          {" "}
                          <Input
                            style={{ fontFamily: "Sriracha, cursive" }}
                            type="text"
                            size="large"
                            prefix={<MdEmail/>}
                            status={
                              touched.email && errors.email ? "error" : ""
                            }
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row_half">
                      <label>เบอร์โทร</label>
                      <div className="">
                        {" "}
                        <Input
                          style={{ fontFamily: "Sriracha, cursive" }}
                          type="tel"
                          size="large"
                          prefix={<BsFillTelephoneFill/>}
                          status={
                            touched.phoneNumber && errors.phoneNumber
                              ? "error"
                              : ""
                          }
                          name="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          pattern="[0-9]{10}"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input_field2">
                    <div>
                      <label>
                        {/* <i aria-hidden="true" className="fa fa-lock"></i>{" "} */}
                        รหัสผ่าน
                      </label>

                      <Input.Password
                          style={{ fontFamily: "Sriracha, cursive" }}
                          type="password"
                          size="large"
                          prefix={<BiLockAlt/>}
                          status={
                            touched.password && errors.password ? "error" : ""
                          }
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          //required
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                    </div>
                  </div>
                
                  
                  <div className="row clearfix">
                    <div>
                      <label>ที่อยู่</label>
                      <div className="textarea_field">
                        {" "}
                        <span>
                          <i aria-hidden="true" className="fa fa-comment"></i>
                        </span>
                        <Input.TextArea
                          size="large"
                          status={
                            touched.address && errors.address ? "error" : ""
                          }
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          cols={46}
                          rows={3}
                        ></Input.TextArea>
                      </div>
                    </div>
                  </div>
                  <Upload
                    name="avatar"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleChangeImaage}
                  >
                    <Button style={{ fontFamily: "Sriracha, cursive" }} loading={loading} icon={<UploadOutlined />}>
                      เพิ่มรูปภาพ
                    </Button>
                  </Upload>
                  <div className="row_half u-margin-bottom-medium">
                    {imageUrl ? (
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
                          style={{
                            width: "100%",
                            height: "100%",
                            margin: "10px",
                          }}
                        />
                      </Badge>
                    ) : (
                      <UploadOutlined
                        className="img-opacity"
                        style={{ fontSize: "120px" }}
                      />
                    )}
                  </div>

                  <Input style={{ fontFamily: "Sriracha, cursive" }} className="button" type="submit" value="ลงทะเบียน" />
                  <div className="signup-link2">
                    <Link to="/login">ยกเลิก</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
    </>
    
    
  );
    
}

export default RegiterU;
