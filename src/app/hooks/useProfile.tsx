import { ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

type MenuItem = Required<MenuProps>["items"][number];
const useProfile =() => {
  const navigate = useNavigate();
  const { account } = useAppSelector((state) => state.account);
  


  interface Page {
    key?: string;
  }
  const onPageA = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/userprofile/profile");
        break;
      case "2":
        navigate("/userprofile/history");
        break;
      // case "3":
      //   navigate("/admin/listproduct");
      //   break;
      // case "4":
      //   navigate("/");
      //   break;
      // case "9":
      //   navigate("/");
      //   dispatch(resetProductParams());
      //   break;
      default:
        break;
    }
  };

  
  const items: MenuItem[] = [
    getItem(
      "ข้อมูลผู้ใช้งาน","1",
      <UserOutlined style={{ fontSize: "20px" }} />
    ),
    getItem("รายการสินค้า", "2", <ShopOutlined style={{ fontSize: "20px" }} />),
  ];
  
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    childrenA?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      childrenA,
      label,
    } as MenuItem;
  }
  return { SiderA: (<div className="bodyC">
  <div className="container">
    <div
      className="col-md-12"
      style={{ maxHeight: "20%", marginTop: "7%" }}
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
                defaultSelectedKeys={['1']}
              >
                
              </Menu>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="col-md-8">
        <div className="portlet light bordered">
          <div className="portlet-body">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>)
,onPageA:onPageA
}
}

export default useProfile