import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/configureStore";
import UserProfile from "./UserProfile";

type MenuItem = Required<MenuProps>["items"][number];
function FormUserinfo({ children }: any) {
  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);

  interface Page {
    key?: string;
  }
  
  const onPage = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/userprofile/infoprofile");
        break;
      case "2":
        navigate("/userprofile/updateprofile" , { state: account });
        break;
      default:
        break;
    }
  };
  const itemsCol: MenuItem[] = [
    getItem("ข้อมูล", "1", <InfoCircleOutlined style={{ fontSize: "20px" }} />),
    getItem("แก้ไข", "2", <EditOutlined style={{ fontSize: "20px" }}/>),
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
    <UserProfile>
      <div>
        <ul className="nav nav-tabs" role="tablist">
          <Menu
            onClick={(e) => onPage({ key: e.key })}
            items={itemsCol}
            className="nav nav-tabs"
            mode="horizontal"
            
            style={{
              backgroundColor: "#f6f4f4",
              color: "orange",
              borderTopLeftRadius: "10px",
              borderTopRightRadius:"10px",
              
            }}
          ></Menu>
        </ul>
        {children}
        
      </div>
    </UserProfile>
  );
}

export default FormUserinfo;
