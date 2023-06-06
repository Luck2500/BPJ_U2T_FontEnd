import "./HomeOrder.css";
import useOrder from "../../../app/hooks/useOrder";
import moment from "moment";
import { Button, Descriptions, Empty, Space } from "antd";
import ModalFormOrder from "./ModalFormOrder";
import { useEffect, useState } from "react";
import {
  fetchOrderByIdAccount,
  resetOrder,
} from "../../../app/store/orderSlice";
import { loadAccountStorage } from "../../../app/store/accountSlice";
import { useAppDispatch } from "../../../app/store/configureStore";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

function HomeOrderU() {
  const account = loadAccountStorage();
  const dispatch = useAppDispatch();
  const { order, } = useOrder();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formfile, setFormFile] = useState<string>("");
  const [id, setId] = useState<string>("");
  const onClickOpenPaymentForm = (orderId: any, formfile: any) => {
    setModalOpen(true);
    setId(orderId);
    setFormFile(formfile);
  };

  useEffect(() => {
    dispatch(fetchOrderByIdAccount(account.id));
    if (!order) resetOrder();
  }, [order]);

  return (
    <div className="bodyD">
      <div
          
          style={{ backgroundColor: "#f4daf9" }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "50px" }}
          >
            <h1 style={{textAlign:"center"}} className="center">รายการใบสั่งซื้อ</h1>
          </div>
        </div>
      <div className="container">
        {order?.length === 0 ? (
          <>
            <div className="form-group col-md-12">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="ไม่มีรายการสั่งซื้อ"
                className="text-st"
                style={{height:"300px"}}
              />
            </div>
          </>
        ) : (
          <>
            {order?.map((orderlist) => {
              return (
                <>

                  {orderlist.paymentStatus === 2 ? (
                    <></>
                  ) : (
                    <>
                      <div className="row" style={{ marginTop: "25px" }}>
                        <div className="col-lg-12">
                          <div className="cardA mb-4">
                            <div className="card-body">
                              <div
                                className="mb-3 d-flex justify-content-between"
                                style={{ padding: "5px", margin: "5px" }}
                              >
                                <div>
                                  <span className="me-3">
                                   
                                  <CalendarOutlined style={{marginRight:"2px"}} /> {" "}
                                    {moment
                                      .utc(orderlist.created)
                                      .format("DD/MM/YYYY")} <ClockCircleOutlined style={{marginRight:"2px"}}/>{" "}
                                    {moment
                                      .utc(orderlist.created)
                                      .format("HH:mm:ss")}{" "}
                                  </span>
                                  <div
                                    className="me-3"
                                    style={{ marginTop: "10px" }}
                                  >
                                    {orderlist.paymentStatus === 0 ? (
                                      <>
                                        <span
                                          style={{
                                            background: "red",
                                            float: "right",
                                          }}
                                          className="badge  rounded-pill d-inline "
                                        >
                                          ยังไม่ชำระเงิน
                                        </span>
                                      </>
                                    ) : orderlist.paymentStatus === 1 ? (
                                      <>
                                        <span
                                          style={{
                                            background: "#3498DB",
                                            float: "right",
                                          }}
                                          className="badge  rounded-pill d-inline "
                                        >
                                          รอการอนุมัติ
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        
                                      </>
                                    )}

                                    <p>หมายเลขสั่งซื้อ : {orderlist.id}</p>
                                  </div>
                                </div>
                              </div>
                              <table className="table table-borderless">
                                <tbody>
                                  {orderlist.orderItems?.map((prorder: any) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>
                                            <div className="d-flex mb-2">
                                              <div className="flex-shrink-0">
                                                <div className="lg-grow-5 ms-4">
                                                  <img
                                                    src={
                                                      "http://10.103.0.16/cs63/s18/PJEnd/images/" +
                                                      prorder.product.image
                                                    }
                                                    alt=""
                                                    width="50"
                                                    className="img-fluid"
                                                    key={orderlist.id}
                                                  />{" "}
                                                  {prorder.product.name}
                                                  <h6 className="small mb-0">
                                                    จำนวน :{" "}
                                                    {prorder.productAmount} ชิ้น
                                                  </h6>
                                                  <span>
                                                    ราคาสินค้า :{" "}
                                                    {prorder.product.price} บาท
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td />
                                          <td />
                                          <td />
                                          <td className="text-end">
                                            ราคาสุทธิ :{" "}
                                            {prorder.product.price *
                                              prorder.productAmount}{" "}
                                            บาท
                                          </td>
                                        </tr>
                                        <tr></tr>
                                      </>
                                    );
                                  })}
                                </tbody>

                                <tfoot>
                                  <tr>
                                    <td colSpan={1}>ราคารวมสุทธิ</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td className=" text-end">
                                      {orderlist.priceTotal} บาท
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={1}>ค่าจัดส่ง</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td className="text-danger text-end">
                                      {orderlist.deliveryFee} บาท
                                    </td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td colSpan={1}>ราคารวม</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td className="text-end">
                                      {orderlist.priceTotal +
                                        orderlist.deliveryFee}{" "}
                                      บาท
                                    </td>
                                  </tr>
                                  <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                  </tr>
                                </tfoot>
                              </table>
                              <ModalFormOrder
                                modalOpen={modalOpen}
                                setModalOpen={setModalOpen}
                                order={orderlist}
                                idOrder={id}
                                FormFile={formfile}
                              />
                              {orderlist.paymentStatus === 0 ? (
                                <>
                                  <Descriptions
                                    column={1}
                                    className="text-st"
                                    extra={
                                      <Space>
                                        <Button
                                          style={{
                                            float: "right",
                                            marginRight: "40px",
                                            margin: "10px",
                                          }}
                                          className=" btn-sm btn-rounded"
                                          onClick={() =>
                                            onClickOpenPaymentForm(
                                              orderlist.id,
                                              orderlist.proofOfPayment
                                            )
                                          }
                                        >
                                          ยืนยันการชำระ
                                        </Button>
                                      </Space>
                                    }
                                  ></Descriptions>
                                </>
                              ) : orderlist.paymentStatus === 1 ? (
                                <>
                                  <Descriptions
                                    column={1}
                                    className="text-st"
                                    extra={
                                      <Space>
                                        <Button
                                          style={{
                                            float: "right",
                                            marginRight: "40px",
                                            margin: "10px",
                                          }}
                                          className=" btn-sm btn-rounded"
                                          onClick={() =>
                                            onClickOpenPaymentForm(
                                              orderlist.id,
                                              orderlist.proofOfPayment
                                            )
                                          }
                                        >
                                          ดูประวัติการชำระ
                                        </Button>
                                      </Space>
                                    }
                                  ></Descriptions>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default HomeOrderU;
