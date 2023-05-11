import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import LayoutAdmin from "../PageAdmin/LayoutAdmin";
import { Account } from "../../../app/models/Account";
import { Button } from "antd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { fetchAccountAll } from "../../../app/store/accountSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import agent from "../../../app/api/agent";
import PDFAccount from "./PDFAccount/PDFAccount";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const PageUesr = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { accountAll, accountAllLoaded } = useAppSelector(
    (state) => state.account
  );
  useEffect(() => {
    if (!accountAllLoaded) dispatch(fetchAccountAll());
  }, [accountAllLoaded, dispatch]);
  const DeleteAccount = (id: any) => {
    Swal.fire({
      title: "คุณต้องการจัดการผู้ใช้นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("เรียบร้อย!", "เรียบร้อย", "success").then(async () => {
          await agent.Account.removeAccount(id).then(() =>
            dispatch(fetchAccountAll())
          );
        });
      }
    });
  };
  const handleOnExport = () => {
    // eslint-disable-next-line prefer-const
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(accountAll as Account[]);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "รายงานสินค้า.xlsx");
  };

  const accounttest = accountAll?.map((accall) => {
    return (
      <tr>
        <td>
          <div className="">
            <img
              src={accall.image}
              alt=""
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            {/* <div className="ms-3">
              <p className="fw-bold mb-1">รหัสสิค้า: {products.id}</p>
              <p className="text-muted mb-0"></p>
            </div> */}
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{accall.name}</p>
        </td>
        <td>{accall.email}</td>
        <td>{accall.phoneNumber}</td>
        <td>
          {accall.roleName !== "admin" ? (
            <>
              <span
                style={{ background: "blue" }}
                className="badge  rounded-pill d-inline "
              >
                {accall.roleName}
              </span>
            </>
          ) : (
            <>
              <span
                style={{ background: "red" }}
                className="badge rounded-pill d-inline "
              >
                {accall.roleName}
              </span>
            </>
          )}
        </td>
        <td>
          <Button
            onClick={() =>
              navigate(`/admin/account/detail/${accall.id}`, { state: accall })
            }
            style={{ marginLeft: "1%" }}
            className=" btn-sm btn-rounded"
          >
            <MoreHorizIcon />
          </Button>
          {accall.roleName !== "admin" ? (
            <>
              <Button
                danger
                onClick={() => {
                  DeleteAccount(accall.id);
                }}
                style={{ marginLeft: "1%" }}
                className=" btn-sm btn-rounded"
              >
                <DeleteForeverIcon />
              </Button>
            </>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  });

  return (
    <LayoutAdmin>
      <h3>ผู้ใช้งาน</h3>
      <PDFDownloadLink
        document={<PDFAccount account={accountAll as Account[]} />}
        fileName="รายงานผู้ใช้งาน.pdf"
      >
        <Button
          className=" btn-sm btn-rounded"
          style={{marginTop:"5px", marginLeft: "0.25%" }}
          danger
        >
          <FilePdfOutlined /> PDF
        </Button>
      </PDFDownloadLink>
      <Button
        className=" btn-sm btn-rounded"
        style={{ color: "green", marginLeft: "0.5%" }}
        onClick={handleOnExport}
      >
        <FileExcelOutlined />
        Excel{" "}
      </Button>{" "}
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th scope="col">รูปผู้ใช้งาน</th>
              <th scope="col">ชื่อผู้ใช้</th>
              <th scope="col">อีเมลล์</th>
              <th scope="col">เบอร์โทร</th>
              <th scope="col">บทบาท</th>
              <th scope="col">การจัดการ</th>
            </tr>
          </thead>
          <tbody>{accounttest}</tbody>
        </table>
      </div>
    </LayoutAdmin>
  );
};

export default PageUesr;
