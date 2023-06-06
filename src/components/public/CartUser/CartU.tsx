import { Button, Empty } from "antd";
import { Link } from "react-router-dom";
import { fetchCartAsync, updateCartAsync } from "../../../app/store/cartSlice";
import { useAppDispatch } from "../../../app/store/configureStore";
import { InputNumber } from "antd";
import Swal from "sweetalert2";
import agent from "../../../app/api/agent";
import useCart from "../../../app/hooks/useCart";
import { ItemRequest, OrderRequest } from "../../../app/models/Order";
import { CloseOutlined } from "@ant-design/icons";

function CartU() {
  const { account } = JSON.parse(localStorage.getItem("account")!);
  const { carts } = useCart();

  const dispatch = useAppDispatch();
  const priceTotal = carts?.reduce((curNumber, item) => {
    return curNumber + item.amountProduct * item.product.price;
  }, 0);

  async function onChangeNumberCart({ value, data }: any) {
    const result: any = dispatch(
      updateCartAsync({
        data: data,
        amountProduct: value,
        idAccount: account?.id,
      })
    );
    if (result.msg === "OK") {
      dispatch(fetchCartAsync(account?.id));
    }
    dispatch(fetchCartAsync(account?.id));
  }
  const orderreuest: OrderRequest = {
    accountId: account ? account.id : "",
    items: carts
      ? carts.map(
          (cart) =>
            ({
              id: cart.id,
              productID: cart.product.id,
              productPrice: cart.product.price,
              productAmount: cart.amountProduct,
            } as ItemRequest)
        )
      : [],
  };
  const onClickOrder = async () => {
    const result = await agent.Order.create(orderreuest);
    if (carts!.length > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => dispatch(fetchCartAsync(account.id)));
    } else {
      Swal.fire({
        title: "กรุณาหยิบสินค้าใส่ตะกร้า!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
      })
    }
    console.log(result);
  };

  const DeleteCart = (id: any) => {
    Swal.fire({
      title: "คุณต้องการยกเลิกสินค้าในตะกร้า?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          confirmButtonText: "ok",
        }).then(async () => {
          await agent.Cart.removecart(id).then(() =>
            dispatch(fetchCartAsync(account?.id))
          );
        });
      }
    });
  };

  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="active">ตะกร้าสินค้า</li>
            </ol>
          </div>
          <div className="table-responsive cart_info" style={{ width: "100%" }}>
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">สินค้า</td>
                  <td className="description">ชื่อ</td>
                  <td className="price">ราคา</td>
                  <td className="quantity">จำนวน</td>
                  <td className="total">รวม</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {carts?.length === 0 ? (
                  <tr>
                    <td colSpan={12}>
                      <div className="form-group col-md-12">
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="ไม่มีข้อมูล"
                          className="text-st"
                        />
                      </div>
                    </td>{" "}
                  </tr>
                ) : (
                  <>
                    {carts?.map((cart) => {
                      return (
                        <>
                          <tr>
                            <td className="cart_product">
                              <a href="">
                                <img
                                  src={cart.imageProduct}
                                  style={{ height: "70px", width: "100px" }}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="cart_description">
                              <h4>{cart.product.name}</h4>
                              <p>รหัสสินค้า: {cart.product.id}</p>
                            </td>
                            <td className="cart_price">
                              <p>{cart.product.price} ฿</p>
                            </td>
                            <td className="cart_quantity">
                              <div className="cart_quantity_button">
                                <InputNumber
                                  style={{
                                    fontSize: "22px",
                                    fontFamily: "Sriracha,cursive",
                                  }}
                                  min={1}
                                  max={cart.product.stock}
                                  value={cart.amountProduct}
                                  onChange={(value) => {
                                    onChangeNumberCart({ value, data: cart });
                                  }}
                                />
                              </div>
                            </td>
                            <td className="cart_total">
                              <p className="cart_total_price">
                                {cart.product.price * cart.amountProduct} ฿
                              </p>
                            </td>
                            <td className="cart_delete">
                              <Button
                                onClick={() => {
                                  DeleteCart(cart.id);
                                }}
                                danger
                                className="cart_quantity_delete"
                              >
                                <CloseOutlined />
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          {/* <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="total_area" style={{ height: "220px" }}>
                <ul>
                  <li>
                    ยอดรวมของตะกร้า <span>{priceTotal} บาท</span>
                  </li>
                  {/* <li>
                    Eco Tax <span>$2</span>
                  </li> */}
                  <li>
                    ค่าใช้จ่ายในการจัดส่งสินค้า <span>ฟรี!</span>
                  </li>
                  <li>
                    รวม <span>{priceTotal} บาท</span>
                  </li>
                  <Button
                    className="btn btn-default check_out"
                    onClick={onClickOrder}
                    style={{ marginTop: "10px", float: "right" }}
                  >
                    ยืนยันสั่งซื้อ
                  </Button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartU;
