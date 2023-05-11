import { Input } from "antd";
import { Formik, Form, ErrorMessage } from "formik";

import { Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import { loginAccount } from "../../../app/store/accountSlice";
import { useAppDispatch } from "../../../app/store/configureStore";

import { LoginValidate } from "./AccontValidate";
import "./Regiter.css";

const value = { email: "", password: "" };

function LoginU() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitForm = async (data: any) => {
    const result = await dispatch(loginAccount(data)).unwrap();
    if (result.msg === "OK") {
      swal({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        buttons: [false, "ตกลง"],
      }).then(() => {
        navigate("/");
      });
    } else {
      swal({
        title: result.msg,
        icon: "warning",
        buttons: [false, "ตกลง"],
      });
    }
  };
  return (
  
    <Formik
      validationSchema={LoginValidate}
      initialValues={value}
      onSubmit={async (values, { setSubmitting }) => {
        await new Promise((r) => setTimeout(r, 400));
        submitForm(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="bodyB ">
          <div className="bg_img"></div>
          <div className="form_wrapper">
            <div className="form_container">
              <div className="title_container">
                <h1>เข้าสู่ระบบ</h1>
              </div>
              <Form onSubmit={handleSubmit} method="POST">
                <div className="row clearfix">
                  <div className="row clearfix">
                    <div>
                      <label> อีเมล์</label>
                      <div>
                        {" "}
                        <Input
                          
                          type="text"
                          size="large"
                          prefix={
                            <i aria-hidden="true" className="fa fa-envelope" />
                          }
                          status={touched.email && errors.email ? "error" : ""}
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

                  <div className="input_field2">
                    <div>
                      <label> รหัสผ่าน</label>

                      <Input.Password
                        
                        type="password"
                        size="large"
                        prefix={<i aria-hidden="true" className="fa fa-lock" />}
                        status={
                          touched.password && errors.password ? "error" : ""
                        }
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                </div>
                <Input
                  style={{ fontFamily: "Sriracha, cursive" }}
                  className="button"
                  type="submit"
                  value="เข้าสู่ระบบ"
                />
                <div className="signup-link">
                  ไม่มีบัญชี? <Link to="/regiter">ลงทะเบียนตอนนี้</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
   
  );
}

export default LoginU;
