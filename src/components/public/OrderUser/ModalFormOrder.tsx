import { Col, Modal, Row, Form, Button, Card, Badge } from "antd";
import { Formik } from "formik";
import {
  beforeUploadAntd,
  Ts,
} from "../../../app/util/util";
import { SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../app/store/configureStore";
import Upload, {
  RcFile,
  UploadProps,
} from "antd/es/upload";
import {
  UploadOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import agent from "../../../app/api/agent";
import { Order, Paymentstatus } from "../../../app/models/Order";
import { fetchOrderByIdAccount } from "../../../app/store/orderSlice";
import { loadAccountStorage } from "../../../app/store/accountSlice";

interface Props {
  modalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setModalOpen: Function;
  order: Order | null;
  idOrder: string;
  FormFile: any;
}



const ModalFormOrder = ({
  modalOpen,
  setModalOpen,
  idOrder,
  FormFile,
}: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  //const [imageUrl, setImageUrl] = useState<Url | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const value: any = {
    ID: "",
    paymentStatus: Paymentstatus.PendingApproval,
    // nameRawMaterial: "",
    // makeProductsprocess: "",
    // vedioFiles: "",
    // productID: idProduct,
  };
  const account = loadAccountStorage();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const submitForm = async (value: any) => {
    let result;

    // result = await agent.Product.updateproduct(value);
    // eslint-disable-next-line prefer-const
    result = await agent.Order.update(value);

    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(fetchOrderByIdAccount(account.id));
      });
  };

  const onClickOpenPaymentForm = () => {
    setModalOpen(true);
    
  };

  return (
    <Formik
      initialValues={value}
      //validationSchema={DetailProductValidate}
      onSubmit={async (values) => {
        values.ID = idOrder;
        submitForm(values);
        console.log(values);
        // handleSubmitForm(values);
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        resetForm,
        setFieldValue,
      }) => {
        const props: UploadProps = {
          name: "FormFiles",
          multiple: false,
          onChange: (info) => {
            if (info.file.status === "uploading") {
              setLoading(true);
              return;
            }
            getBase64(
              info.file.originFileObj as RcFile,
              (url: SetStateAction<string>) => {
                setLoading(false);
                setImageUrl(url);
              }
            );
            setFieldValue("FormFiles", info.file.originFileObj);
          },
        };
        const onCancel = () => {
          setModalOpen(false);
          resetForm();

         
        };

        return (
          <Modal
            title="การชำระเงิน"
            className="text-st"
            confirmLoading={isSubmitting}
            okText={<Ts>ยื่นยัน</Ts>}
            onOk={handleSubmit as any}
            cancelText={<Ts>ยกเลิก</Ts>}
            open={modalOpen}
            onCancel={onCancel}
            width={1250}
          >
            <div className="container">
              <div className="cardd mt-5 mb-5 ">
                <div className="cardd-title mx-auto">
                  หมายเลขสั่งชื้อ : {idOrder}
                </div>

                <Form onFinish={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4 pb-1">
                    <Row gutter={24}>
                      <Col span={12}>
                        <Card>
                          <div style={{ textAlign: "center" }}>
                            <h4 style={{ fontWeight: "bold" }}>หลักฐานการชำระเงิน</h4>
                          </div>
                          <Form.Item name="photos">
                            <Upload
                              {...props}
                              beforeUpload={beforeUploadAntd}
                              showUploadList={false}
                              accept=".png , .jpg"
                            >
                              {!FormFile ? <><Button
                                onClick={() => {
                                  onClickOpenPaymentForm();
                                }}
                                style={{ fontFamily: "Sriracha, cursive" }}
                                loading={loading}
                                icon={<UploadOutlined />}
                              >
                                หลักฐานการชำระเงิน
                              </Button></> : <><Button
                                onClick={() => {
                                  onClickOpenPaymentForm();
                                }}
                                style={{ fontFamily: "Sriracha, cursive" }}
                                loading={loading}
                                icon={<UploadOutlined />}
                              >
                                แก้ไขหลักฐานการชำระเงิน
                              </Button></>}
                              

                              <br />
                              <Badge>
                                {!FormFile ? (
                                  <>
                                    {!imageUrl ? (
                                      <>
                                        <img
                                          src="https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"
                                          className="img-thumbnail"
                                          alt="..."
                                          style={{
                                            width: "100%",
                                            height: "200px",
                                            marginTop: "10px",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={imageUrl}
                                          className="img-thumbnail"
                                          alt="..."
                                          style={{
                                            width: "100%",
                                            height: "200px",
                                            marginTop: "10px",
                                          }}
                                        />
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {!imageUrl ? (
                                      <>
                                        <img
                                          src={
                                            "https://localhost:7141/images/" +
                                            FormFile
                                          }
                                          className="img-thumbnail"
                                          alt="..."
                                          style={{
                                            width: "100%",
                                            height: "200px",
                                            marginTop: "10px",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={imageUrl}
                                          className="img-thumbnail"
                                          alt="..."
                                          style={{
                                            width: "100%",
                                            height: "200px",
                                            marginTop: "10px",
                                          }}
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </Badge>
                            </Upload>
                          </Form.Item>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card>
                          <img
                            src="https://esvector.net/home_es/images/stories/logo/2-10/26-02-53/Government_Savings_bank.jpg"
                            alt="..."
                            style={{
                              width: "100%",
                              height: "200px",
                              borderRadius: "20px",
                            }}
                          />
                          <div
                            style={{ marginTop: "22px", textAlign: "center" }}
                          >
                            <h4 style={{ fontWeight: "bold" }}>
                              ชื่อบัญชี : นาย ศุธณัฐ คำพุฒ
                            </h4>
                            <div>
                              <h4
                                style={{
                                  fontWeight: "bold",
                                  marginTop: "22px",
                                }}
                              >
                                หมายเลขบัญชี : 0123-4567-8901-2345
                              </h4>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </div>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default ModalFormOrder;
