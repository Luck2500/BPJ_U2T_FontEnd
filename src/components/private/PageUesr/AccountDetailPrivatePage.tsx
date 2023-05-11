import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space,Image, Descriptions } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutAdmin from '../PageAdmin/LayoutAdmin';

const AccountDetailPrivatePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
   
     
  return (
    <LayoutAdmin>
      
      <Row>
        <Col span={24}>
          <h1 className="text-st">ข้อมูลสินค้า</h1>
        </Col>
        
        <Col
          style={{
            display: "flex",
            marginTop:"20px",
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
          <Space direction="vertical">
            <Card>
            {state?.image !== undefined ? (
            <Image
            alt="image-product"
            width={"100%"}
            height={"400px"}
            src={state?.image}
          />
          ) : (
            <img width={"100%"}
            height={"400px"} src="https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/428/5080/no-image__01577.1665668276.jpg?c=2" />
          )}
              
            </Card>
            
          </Space>
        </Col>
        
        <Col span={14}>
          <Space >
          <Card style={{ width: "100%",height: "450px" }}>
              <h4 style={{ textDecoration: "none", fontWeight: "bold" }}>
                ข้อมูล
              </h4>

              <Descriptions style={{ marginTop: "20px" }} >
              <div style={{ fontWeight: "bold" }}>ชื่อผู้ใช้: {state?.name}</div>
              
              <div style={{ fontWeight: "bold" }}>อีเมลล์: {state?.email}</div>
              <br />
              <div style={{ fontWeight: "bold" }}>ที่อยู่: {state?.address}</div>
              
              <div style={{ fontWeight: "bold" }}>เบอร์โทร: {state?.phoneNumber}</div>
              <br />
              
              <div style={{ fontWeight: "bold" }}>บทบาท: {state?.roleName}</div>
              </Descriptions>
              
            </Card>
            
          </Space>
        </Col>
      </Row>
    </LayoutAdmin>
  )
}

export default AccountDetailPrivatePage