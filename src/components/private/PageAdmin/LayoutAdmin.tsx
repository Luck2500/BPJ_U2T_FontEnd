import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { VscDashboard } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { loadAccountStorage } from "../../../app/store/accountSlice";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

type MenuItem = Required<MenuProps>["items"][number];
const LayoutAdmin = ({ children }: any) => {
  const { account } = loadAccountStorage();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const onPage = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/admin/home");
        break;
      case "2":
        navigate("/admin/listuser");
        break;
      case "3":
        navigate("/admin/listproduct");
        break;
        case "4":
        navigate("/admin/order");
        break;
      case "5":
        navigate("/");
        break;
      // case "9":
      //   navigate("/");
      //   dispatch(resetProductParams());
      //   break;
      default:
        break;
    }
  };
  interface Page {
    key?: string;
  }
  const items: MenuItem[] = [
    getItem("แดชบอร์ด", "1", <VscDashboard style={{ fontSize: "20px" }} />),
    getItem("ผู้ใช้งาน", "2", <UserOutlined style={{ fontSize: "20px" }} />),
    getItem("รายการสินค้า", "3", <ShopOutlined style={{ fontSize: "20px" }} />),
    getItem("รายการใบสั่งซื้อ", "4", <PlaylistAddCheckCircleIcon style={{ fontSize: "20px" }} />),
    getItem("กลับหน้าแรก", "5", <ArrowBackIcon style={{ fontSize: "20px" }} />),
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  return (
    <>
      <Layout style={{ minHeight: "400rem" }}>

        <Sider
          theme="light"
          trigger={null}
          style={{ backgroundColor: "#f1daff",}}
          collapsible
          
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Container className="center" style={{ padding: "5px" }}>
            <div className="logo pull-left">
              <a>
                <img
                  src="https://drive.google.com/uc?id=1xswTq6VhgPKPXS07gWH3ZuEN9CEsS5-4"
                  alt="logo image"
                  width="100%"
                  height="100%"
                />
              </a>
            </div>
          </Container>
          <Menu
            style={{
              backgroundColor: "#f1daff",
              fontFamily: "Sriracha, cursive",
            }}
            onClick={(e) => onPage({ key: e.key })}
            className="text-st"
            theme="light"
           
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout className="site-layout">
          <Header style={{ padding: 10, background: colorBgContainer }}>
          
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Avatar style={{float:"right"}} src={account?.image} />
          </Header>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>

          <div
            style={{
              margin: " 16px",
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              backgroundColor: "#fcfcfc",
            }}
          >
            {children}
          </div>
          
        </Layout>
        
      </Layout>
    </>
  );
};

export default LayoutAdmin;
