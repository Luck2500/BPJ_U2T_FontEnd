import {
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Row,
  Space,
  Modal,
  Button,
  Empty,
  Badge,
} from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { currencyFormat } from "../../../app/util/util";

import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import Swal from "sweetalert2";
import LayoutAdmin from "../PageAdmin/LayoutAdmin";
import ModalFormDetailProduct from "./ModalFormDetailProduct";
import {
  deleteDetailProductAsync,
  fetchProductDetailProcessByIdProductAsync,
  reSetDetailProduct,
} from "../../../app/store/ProductDetailProcess";
import {
  fetchDetailProduct,
  productSelectors,
} from "../../../app/store/productSlice";
import useProducts from "../../../app/hooks/useProducts";
import useProductDetailProcess from "../../../app/hooks/useProductDetailProcess";
import { Form, Formik } from "formik";
import agent from "../../../app/api/agent";
import { useDropzone } from "react-dropzone";
import usedetailProduct from "../../../app/hooks/useDetailProductImage";
import { fetchImageProductsAsync } from "../../../app/store/detailProductImage";
import { Typography } from "antd";

const ProductDetailPrivatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { idProduct } = useParams<{ idProduct: any }>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { state } = useLocation();
  const [urlModal, setUrlModal] = useState<string>("");
  const { detailProduct } = useProducts();
  const { Text } = Typography;
  const { productDetailProcess, productDetailProcessLoaded } =
    useProductDetailProcess();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, idProduct)
  );
  const { detailProductImage } = usedetailProduct();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const img = {
    display: "block",

    height: "100%",
  };
  const handleDelete = (index: any) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  const thumbsContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  const thumb: React.CSSProperties = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Badge
          count={
            <Button
              type="primary"
              shape="circle"
              htmlType="button"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleDelete(file)}
              size="small"
              style={{ marginLeft: "5px" }}
            />
          }
        />
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    if (!product) dispatch(fetchDetailProduct(idProduct));
  }, [idProduct, dispatch, product]);
  useEffect(() => {}, [state]);

  useEffect(() => {
    dispatch(fetchProductDetailProcessByIdProductAsync(idProduct));
    return () => {
      dispatch(reSetDetailProduct());
    };
  }, [productDetailProcessLoaded, dispatch]);

  const infoProduct = [
    { title: "ชื่อ", info: detailProduct?.name },
    {
      title: "ราคา",
      info: (
        <div
          className="text-st"
          style={{ backgroundColor: "#FFFFFF" }}
          key={detailProduct?.id}
        >
          {currencyFormat(detailProduct?.price)}
        </div>
      ),
    },
    {
      title: "จำนวน",
      info: (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            fontFamily: "Sriracha, cursive",
          }}
          key={detailProduct?.id}
        >
          {detailProduct?.stock} ชิ้น
        </div>
      ),
    },
    { title: "ตำบล", info: detailProduct?.districtName },
    { title: "ประเภทสินค้า", info: detailProduct?.categoryName },
  ];

  const infoDetailProduct = [
    { title: "วัตถุการทำผลิตภัณฑ์", info:(<Text style={{
      fontFamily: "Sriracha, cursive",
    }}>{productDetailProcess?.nameRawMaterial}</Text>)  },
    { title: "วิธีทำผลิตภัณฑ์", info: (<Text style={{
      fontFamily: "Sriracha, cursive",
    }}>{productDetailProcess?.makeProductsprocess}</Text>) },
    {
      title: "วิดีโอเสนอสินค้า",
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

  interface PreviewFile extends File {
    preview: string;
  }

  // let filelength: any;
  // filelength = detailProductImage?.length;
  // const sumimg = files.length + filelength;

  const handleSubmitForm = async (value: any) => {
    const maxFile = 4;
    const filelength = detailProductImage ? detailProductImage?.length : 0;
    const sumimg = files.length + filelength;
    if ((sumimg as any) <= maxFile) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      })
        .then(async () => {
          await agent.DetailProductImage.create(value);
        })
        .then(() => {
          dispatch(fetchImageProductsAsync(idProduct));
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "อัพรูปภาพเกิน 4 รูป!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const images = detailProductImage?.map((img: any) => {
    return (
      <Image
        src={img?.image}
        style={{ width: "100px", height: "100px", margin: "5px" }}
      />
    );
  });

  const onDelete = () => {
    Swal.fire({
      title: "ลบรายละเอียดหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          confirmButtonText: "ok",
        }).then(async () => {
          await dispatch(deleteDetailProductAsync(idProduct));
          dispatch(reSetDetailProduct());
        });
      }
    });
  };

  const values = {
    formFiles: [],
    productID: idProduct,
  };

  const extraDetail = (
    <Space>
      {productDetailProcess && (
        <Button
          className="text-st"
          danger
          type="primary"
          onClick={() => onDelete()}
          icon={<DeleteOutlined />}
        >
          ลบ
        </Button>
      )}
      {!productDetailProcess ? (
        <>
          <Button
            className="text-st"
            type="primary"
            onClick={() => setModalOpen(true)}
            icon={<EditOutlined />}
          >
            {/* {textButton} */}
            เพิ่ม
          </Button>
        </>
      ) : (
        <></>
      )}
    </Space>
  );

  return (
    <LayoutAdmin>
      <ModalFormDetailProduct
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        productDetailProcess={productDetailProcess}
        idProduct={idProduct}
      />
      <Row>
        <Col span={24}>
          <h1 className="text-st">ข้อมูลสินค้า</h1>
        </Col>
        <Col
          style={{
            display: "flex",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <Button
            style={{ float: "left", backgroundColor: "grey" }}
            className="text-st"
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            กลับ
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={10}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Card>
              <Image
                alt="image-product"
                width={"100%"}
                height={"400px"}
                src={detailProduct?.image}
              />
            </Card>
            <Card>
              <Descriptions
                className="text-st"
                column={4}
                title="รูปภาพเพิ่มเติม"
              />

              <Formik
                initialValues={values}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  handleSubmitForm(values);
                }}
              >
                {({
                  handleSubmit,

                  setFieldValue,
                }) => {
                  const { getRootProps, getInputProps } = useDropzone({
                    accept: {
                      "image/*": [],
                    },
                    onDrop: (acceptedFiles: any) => {
                      const maxFile = 4;
                      const amountFile =
                        detailProductImage &&
                        detailProductImage!.length +
                          acceptedFiles.length +
                          files.length;
                      if ((amountFile as any) <= maxFile) {
                        Swal.fire({
                          title: "อัพรูปเกิน 4 รูป!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          cancelButtonText: "ยกเลิก",
                          confirmButtonText: "ตกลง",
                        });
                      } else {
                        setFieldValue("formFiles", acceptedFiles);
                        setFiles(
                          acceptedFiles.map((file: any) =>
                            Object.assign(file, {
                              preview: URL.createObjectURL(file),
                            })
                          )
                        );
                      }
                    },
                  });

                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="comment-text active  pt-3">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <Card>
                            <input {...getInputProps()} />
                            <p>เลือกไฟล์ได้ 4 รูปเท่านั้น!</p>
                          </Card>
                        </div>
                        <aside style={thumbsContainer}>{thumbs}</aside>
                      </div>

                      {files.length === 0 ? (
                        <div></div>
                      ) : (
                        <>
                          <Button htmlType="submit">ตกลง</Button>
                          {/* <Button danger style={{ marginLeft: "10px" }}>
                            ยกเลิก
                          </Button> */}
                        </>
                      )}
                      <div style={{ marginTop: "10px" }}>{images}</div>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
          </Space>
        </Col>
        <Modal
          open={openModal}
          footer={null}
          onCancel={() => {
            setOpenModal(false);
            setUrlModal("");
          }}
        >
          <img alt="example" style={{ width: "100%" }} src={urlModal} />
        </Modal>
        <Col span={14}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Card style={{ width: "100%" }}>
              <h4 style={{ textDecoration: "none", fontWeight: "bold" }}>
                ข้อมูล
              </h4>

              <Descriptions
                style={{ marginTop: "20px", width: "100%" }}
                className="text-st"
              >
                {React.Children.toArray(
                  infoProduct.map(({ info, title }) => (
                    <Descriptions.Item
                      labelStyle={{ fontWeight: "bold" }}
                      label={title}
                    >
                      {info}
                    </Descriptions.Item>
                  ))
                )}
              </Descriptions>
              <div style={{ fontWeight: "bold" }}>รายละเอียด:</div>
              <div>
                <Text
                  style={{
                    fontFamily: "Sriracha, cursive",
                  }}
                >
                  {detailProduct?.detailsinfo}
                </Text>
              </div>
            </Card>
            <Card style={{ width: "100%" }}>
              <Descriptions
                column={1}
                title="การส่งเสริมผลิตภัณฑ์"
                className="text-st"
                extra={extraDetail}
              >
                {productDetailProcess &&
                  React.Children.toArray(
                    infoDetailProduct.map(({ info, title }) => (
                      <Descriptions.Item
                        labelStyle={{ fontWeight: "bold" }}
                        label={title}
                      >
                        {info}
                      </Descriptions.Item>
                    ))
                  )}
              </Descriptions>
              {!productDetailProcess && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="ไม่มีข้อมูล"
                  className="text-st"
                />
              )}
            </Card>
          </Space>
        </Col>
      </Row>
    </LayoutAdmin>
  );
};
export default ProductDetailPrivatePage;
