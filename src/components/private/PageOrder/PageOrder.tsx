import { Button, Card, Empty, Image } from "antd";
import LayoutAdmin from "../PageAdmin/LayoutAdmin";
import useOrder from "../../../app/hooks/useOrder";
import agent from "../../../app/api/agent";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../app/store/configureStore";
import { fetchOrderConfirm } from "../../../app/store/orderSlice";

const PageOrder = () => {
  const { orderConfirm } = useOrder();
  const dispatch = useAppDispatch();
  const onClickOrder = async (value : any) => {
    const result = await agent.Order.putconfirm({ID: value});
    if (result.msg === "OK") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => dispatch(fetchOrderConfirm()))
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "บันทึกไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  return (
    <LayoutAdmin>
      <>
      <h3 style={{textAlign:"center"}}>รายการยื่นยันการสั่งซื้อ</h3>
        <div className="row " >
        <br />
        <br />
        {orderConfirm?.length === 0 ? (
          <>
            <div className="form-group col-md-12">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="ไม่มีข้อมูล"
                className="text-st"
              />
            </div>
          </>
        ):(<>{orderConfirm?.map((ord:any)=>{
          return (
            <>
            
            <div className="col-sm-4" style={{marginTop:"20px"}}>
            <Card style={{ width: "100%" }}>
              <div className="card h-100">
                <p style={{textAlignLast:"center", fontWeight:"bold"}}>หลักฐานการชำระเงิน</p>
                <Image
                  src={"https://localhost:7141/images/"+ ord.proofOfPayment}
                  style={{ width: "100%", height:"300px", display:"flex", justifyContent:"center" }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text" style={{textAlign:"center",fontWeight:"bold", marginTop:"10px" , width:"100%" }} >รหัสใบสั่งซื้อ : {ord.id}</p>
                  <p className="card-text" style={{textAlign:"center", marginTop:"10px" , width:"100%" }}>
                    จำนวนเงิน : {ord.priceTotal} บาท
                  </p>
                </div><Button onClick={()=>{onClickOrder(ord.id)}} style={{float:"right",justifyContent:"center" , color:"green"}} htmlType="button"  className=" btn-light-blue btn-md">
                  ยื่นยันการอนุมัติ
                </Button>
                {/* <Button style={{float:"left"}} htmlType="button" danger className=" btn-light-blue ">
                  ยกเลิก
                </Button> */}
                
                
              </div>
            </Card>
            
          </div>
            </>
          )
        })}</>)}
        
          
         
        </div>
      </>
    </LayoutAdmin>
  );
};

export default PageOrder;
