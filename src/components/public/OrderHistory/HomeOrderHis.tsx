import { useEffect } from "react";
import UserProfile from "../UserProfile/UserProfile";
import { loadAccountStorage } from "../../../app/store/accountSlice";
import { useAppDispatch } from "../../../app/store/configureStore";
import useOrder from "../../../app/hooks/useOrder";
import {
  fetchOrderByIdAccount,
  resetOrder,
} from "../../../app/store/orderSlice";
import moment from "moment";

const HomeOrderHis = () => {
  const account = loadAccountStorage();
  const dispatch = useAppDispatch();
  const { order, } = useOrder();
  
  useEffect(() => {
    dispatch(fetchOrderByIdAccount(account.id));
    if (!order) resetOrder();
  }, [order]);

  return (
    <UserProfile>
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="rounded">
              <div className="table-responsive table-borderless">
                <table className="table">
                  <thead>
                    <tr>
                      <th>หมายเลขสั่งซื้อ</th>

                      <th>สถานะ</th>
                      <th>ราคารวม</th>
                      <th>วันที่สั่งซื้อ</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {order?.map((orderlist) => {
                      return (
                        <>
                          {orderlist.paymentStatus === 2 ? (
                            <>
                              <tr className="cell-1">
                                <td>{orderlist.id}</td>

                                <td>
                                  <span
                                    style={{
                                      background: "#17830b",
                                    }}
                                    className="badge badge-success"
                                  >
                                    สำเร็จ
                                  </span>
                                </td>
                                <td>{orderlist.priceTotal} บาท</td>
                                <td>
                                  {moment
                                    .utc(orderlist.created)
                                    .format("DD/MM/YYYY")}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              
                            </>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserProfile>
  );
};

export default HomeOrderHis;
