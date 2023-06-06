import { Col, Modal, Row, Space, Input, Form, Button } from "antd";
import { Formik } from "formik";
import { beforeUploadVdoAntd, Ts } from "../../../app/util/util";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/store/configureStore";
import { DataProductDetailProcess } from "../../../app/models/ProductDetailProcess";
import { fetchProductDetailProcessByIdProductAsync } from "../../../app/store/ProductDetailProcess";
import Upload, {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { DeleteFilled, VideoCameraFilled } from "@ant-design/icons";
import Swal from "sweetalert2";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import agent from "../../../app/api/agent";

interface Props {
  modalOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setModalOpen: Function;
  productDetailProcess: DataProductDetailProcess | null;
  idProduct: number;
}

interface Url {
  id: string;
  url: string;
}

const ModalFormDetailProduct = ({
  modalOpen,
  setModalOpen,
  productDetailProcess,
  idProduct,
}: Props) => {
  const dispatch = useAppDispatch();
  const [videoUrl, setVideoUrl] = useState<Url | null>(null);
  const [videoDatas, setVideoDatas] = useState<any>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  
  const value: any = {
    id: "",
    nameRawMaterial: "",
    makeProductsprocess: "",
    vedioFiles: "",
    productID: idProduct,
  };

  const submitForm = async (value: any) => {
    let result;
    // result = await agent.Product.updateproduct(value);
    if(!productDetailProcess) result = await agent.ProductDetailProcess.addProductDetailProcess(value);
    else result = await agent.ProductDetailProcess.updateProductDetailProcess(value);
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(fetchProductDetailProcessByIdProductAsync(idProduct))
      }
      
      );
  };

  

  const getBase64 = (
    data: RcFile,
    callback: (url: string) => void,
    ket: string
  ) => {
    const reader = new FileReader();
    if (ket === "vdo") setVideoDatas(data);
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(data);
  };
  const handleChangeVideo: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setVideoLoading(true);
      return;
    }
    getBase64(
      info.file.originFileObj as RcFile,
      (url) => {
        setVideoLoading(false);
        setVideoUrl({ id: info.file.uid, url: url });
      },
      "vdo"
    );
  };
  const removeUrl = ( key: string) => {
    switch (key) {
      default:
        setVideoDatas(null);
        setVideoUrl(null);
        break;
    }
  };

  return (
    <Formik
      initialValues={value}
      //validationSchema={DetailProductValidate}
      onSubmit={async (values) => {
        values.vedioFiles = videoDatas ;
        submitForm(values);
        console.log(values);
        // handleSubmitForm(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm,
        setValues,
      }) => {
        const onCancel = () => {
          setModalOpen(false);
          resetForm();
          setVideoUrl(null);
          setVideoDatas(null);
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (productDetailProcess) setValues(productDetailProcess, false);
          else resetForm();
        }, [productDetailProcess, modalOpen]);

        return (
          <Modal
            title="การส่งเสริมผลิตภัณฑ์"
            className="text-st"
            confirmLoading={isSubmitting}
            okText={<Ts>ตกลง</Ts>}
            onOk={handleSubmit as any}
            cancelText={<Ts>ยกเลิก</Ts>}
            open={modalOpen}
            onCancel={onCancel}
            width={900}
          >
            <Form onFinish={handleSubmit} layout="vertical">
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex", width: "100%", padding: "20px" }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label={<Ts>วัตถุการทำผลิตภัณฑ์</Ts>}>
                      <Input.TextArea
                        status={
                          touched.nameRawMaterial && errors.nameRawMaterial
                            ? "error"
                            : ""
                        }
                        name="nameRawMaterial"
                        value={values.nameRawMaterial}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoSize
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<Ts>วิธีทำผลิตภัณฑ์</Ts>}>
                      <Input.TextArea
                        status={
                          touched.makeProductsprocess &&
                          errors.makeProductsprocess
                            ? "error"
                            : ""
                        }
                        name="makeProductsprocess"
                        value={values.makeProductsprocess}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoSize
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<Ts>วิดีโอแนะนำสินค้า</Ts>}>
                      <Upload
                        accept="video/*"
                        name="avatar"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUploadVdoAntd}
                        onChange={handleChangeVideo}
                      >
                        {!values.videoProduct ? <><Button
                          className="text-st"
                          loading={videoLoading}
                          disabled={!!videoUrl}
                          danger
                          size="small"
                          icon={<VideoCameraFilled />}
                        >
                          เพิ่มวิดีโอ {videoUrl ? "1/1" : "0/1"}
                        </Button>
                        </>:<>
                        <Button
                          className="text-st"
                          loading={videoLoading}
                          disabled={!!videoUrl}
                          danger
                          size="small"
                          icon={<VideoCameraFilled />}
                        >
                          แก้ไขวิดีโอ {videoUrl ? "1/1" : "0/1"}
                        </Button>
                        </>}
                        
                      </Upload>
                    </Form.Item>
                    <Space direction="horizontal">
                        

                      {videoUrl ? (
                        <ImageListItem>
                          <video controls width={"100%"} height={"80rem"}>
                            <source src={videoUrl.url} />
                          </video>
                          <ImageListItemBar
                            actionIcon={
                              <Space>
                                <DeleteFilled
                                  onClick={() => removeUrl("video")}
                                />
                              </Space>
                            }
                          />
                        </ImageListItem>
                      ) : (
                        <></>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default ModalFormDetailProduct;
