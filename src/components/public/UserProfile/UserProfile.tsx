import React, { useEffect } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import "./UserPro.css";
import { fetchAccount } from "../../../app/store/accountSlice";

type MenuItem = Required<MenuProps>["items"][number];
const UserProfile = ({ children }: any) => {
  
  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(!account)dispatch(fetchAccount());
  }, [account, dispatch]);

  interface Page {
    key?: string;
  }
  const onPageA = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/userprofile/infoprofile");
        break;
        
      case "2":
        navigate("/userprofile/orderhistory");
        break;
      default:
        break;
    }
  };

  
  const items: MenuItem[] = [
    getItem(
      "ข้อมูลผู้ใช้งาน","1",
      <UserOutlined style={{ fontSize: "20px" }} />
    ),
   
    getItem("ประวัติการสั่งซื้อ", "2", <ClockCircleOutlined style={{ fontSize: "20px" }}/>),
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
    
    <div className="bodyC">
      <div >
        <div
          className="col-md-12"
          style={{  marginTop: "2%" }}
        >
          <div className="col-md-4">
            <div className="portlet light profile-sidebar-portlet bordered">
              <div className="profile-userpic">
                <img
                  src={account?.image}
                  className="img-responsive"
                  alt=""
                  style={{ width: "20rem", height: "20rem" }}
                />{" "}
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name"> {account?.name} </div>
              </div>
              <div className="profile-usermenu">
                <ul className="nav">
                  <Menu
                    onClick={(e) => onPageA({ key: e.key })}
                    items={items}
                    className="active"
                    style={{backgroundColor: "#FBFBFB",marginTop:"2px"}}
                  >
                  </Menu>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="portlet light bordered">
              <div className="portlet-body">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
