import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchAccount, loadAccountStorage, logout } from "../../../app/store/accountSlice";
import {
  useAppDispatch,
} from "../../../app/store/configureStore";
import { useEffect } from "react";
import { CartMenu } from "./CartMenu";
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';


export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const account = loadAccountStorage()
  useEffect(() => {
    if(!account)dispatch(fetchAccount());
  }, [account, dispatch]);

  return (
    <>
      <ul className="nav navbar-nav collapse navbar-collapse">
        <li>
          <Link to="/">หน้าแรก</Link>
        </li>

        <li className="dropdown">
          <Link to="/shopping">ร้านค้า</Link>
        </li>
        <li>
          <Link to="/about">เกี่ยวกับเรา</Link>
        </li>
        {account !== null ? (
          <li>
            <CartMenu />
          </li>
        ) : (
          <></>
        )}

        {account !== null ? (
          <>
            <li className="dropdown">
              <div>
                <Link
                  to="#"
                  style={{ textDecoration: "none" }}
                  data-toggle="dropdown"
                  className="nav-link dropdown-toggle user-action"
                  aria-expanded="true"
                >
                  <Avatar
                    src={account?.image}
                    style={{ width: "40px", height: "40px" }}
                    className="avatar"
                  />{" "}
                  {account?.name} <i className="fa fa-angle-down"></i>
                </Link>
              </div>

              <ul
                role="menu"
                className="sub-menu"
                style={{ left: "-20px", width: "210px" }}
              >
                <li>
                  <Link to={"/userprofile/infoprofile"}>
                    <i className="fa fa-user"></i>
                    {""} บัญชีของฉัน
                  </Link>
                </li>
                {account?.roleName === "admin" && (
                  <li>
                    <Link
                      to="/admin/home"
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      onClick={() => {
                        
                      }}
                    >
                      <StoreIcon /> จัดการร้านค้า
                    </Link>
                  </li>
                )}
                <li>
                  <Link to={"/order"}>
                  <PlaylistAddCheckCircleIcon />
                    {""} การสั่งซื้อของฉัน
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    onClick={() =>
                      Swal.fire({
                        title: "ออกจากระบบหรือไม่?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3c16e8",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "ยกเลิก",
                        confirmButtonText: "ตกลง",
                      }).then((result) => {
                        if (result.isConfirmed && dispatch(logout())) {
                          Swal.fire("เรียบร้อย", "ออกสู่ระบบสำเร็จ", "success");
                        }
                      })
                    }
                  >
                    <ExitToAppIcon /> ออกจากระบบ
                  </Link>
                </li>
              </ul>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown">
              <div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Avatar
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="avatar"
                  />{" "}
                  เข้าสู่ระบบ
                </Link>
              </div>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
