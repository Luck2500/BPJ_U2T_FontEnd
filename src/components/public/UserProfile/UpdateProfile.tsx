import  { useState } from "react";
import {  Badge, Button, Input, UploadProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  loadAccountStorage,
  setAccount,
} from "../../../app/store/accountSlice";
import agent from "../../../app/api/agent";
import { Formik, Form } from "formik";
import Upload, { RcFile } from "antd/es/upload";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import Swal from "sweetalert2";
import { beforeUploadAntd } from "../../../app/util/util";
import FormUserinfo from "./FormUserinfo";

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const { state } = useLocation();
  console.log(state);
  const { account } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const accountStorage = loadAccountStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const values = {
    id: state ? state.id : "",
    Name: state ? state.name : "",
    Email: state ? state.email : "",
    Password: state ? state.password : "",
    PhoneNumber: state ? state.phoneNumber : "",
    Address: state ? state.address : "",
  };

  interface Props {
    values?: any;
  }
  const handleUpdateAccount = async ({ values }: Props) => {
    if (accountStorage) {
      const { data } = await agent.Account.update(
        values ? values : values,
        account?.id
      );
      localStorage.setItem(
        "account",
        JSON.stringify({ ...accountStorage, account: data })
      );
      dispatch(setAccount({ account: data }));
      console.log(...accountStorage);
    }
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const submitForm = async (value: any) => {
    const result = await agent.Account.update(value, account?.id);
    console.log("ggggg", value);
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate(-1))
        
  };

  return (
    <FormUserinfo>
      <Formik
        initialValues={values}
        onSubmit={async (values) => {
          await new Promise(() =>
            setTimeout(() => {
              handleUpdateAccount({ values: values });
              submitForm(values);
            })
          );

          //
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
            name: "filefrom",
            multiple: false,
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange: (info) => {
              if (info.file.status === "uploading") {
                setLoading(true);
                return;
              }
              getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
              });
              setFieldValue("FormFiles", info.file.originFileObj);
            },
          };

          const RemoveImage = () => {
            setFieldValue("FormFiles", "");
            setImageUrl("");
          };
          return (
            <Form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
              <div className="form-group">
                <label htmlFor="inputName">ชื่อผู้ใช้</label>
                <Input
                  type="text"
                  size="large"
                  status={touched.Name && errors.Name ? "error" : ""}
                  name="Name"
                  style={{fontFamily: "Sriracha, cursive"}}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Name}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="inputName">อีเมลล์</label>
                <Input
                  type="text"
                  size="large"
                  status={touched.Email && errors.Email ? "error" : ""}
                  name="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{fontFamily: "Sriracha, cursive"}}
                  className="form-control"
                  value={values.Email}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="inputName">เบอร์โทร</label>
                <Input
                  type="tel"
                  size="large"
                  status={
                    touched.PhoneNumber && errors.PhoneNumber ? "error" : ""
                  }
                  name="PhoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.PhoneNumber}
                  style={{fontFamily: "Sriracha, cursive"}}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">ที่อยู่</label>
                <Input.TextArea
                  size="large"
                  style={{fontFamily: "Sriracha, cursive"}}
                  status={touched.Address && errors.Address ? "error" : ""}
                  className="form-control"
                  name="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Address}
                  cols={46}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <Upload
                  {...props}
                  beforeUpload={beforeUploadAntd}
                  showUploadList={false}
                >
                  <label htmlFor="exampleInputFile">รูปภาพ</label>
                  <Button
                    loading={loading}
                    type="default"
                    htmlType="button"
                    style={{ marginLeft: "10px" }}
                  >
                    <InsertPhotoIcon />
                    เลือกรูปภาพ
                  </Button>
                  <br />
                  <br />

                  {imageUrl ? (
                    state.image ? (
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
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: "20rem", height: "20rem" }}
                        />
                      </Badge>
                    ) : (
                      <></>
                    )
                  ) : (
                    <img
                      src={account?.image}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "20rem", height: "20rem" }}
                    />
                  )}
                </Upload>
              </div>
              
              <Button htmlType="submit" type="primary">
                บันทึก
              </Button>
            </Form>
          );
        }}
      </Formik>
    </FormUserinfo>
  );
};

export default UpdateProfile;

