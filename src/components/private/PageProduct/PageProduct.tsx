import { useAppDispatch } from "../../../app/store/configureStore";
import EditIcon from "@mui/icons-material/Edit";
import { fetchProduct } from "../../../app/store/productSlice";
import LayoutAdmin from "../PageAdmin/LayoutAdmin";
import { Button } from "antd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import agent from "../../../app/api/agent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFComponent from "./PDFProduct/PDFProduct";
import { Product } from "../../../app/models/Product";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import useProducts from "../../../app/hooks/useProducts";

const PageProduct = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { product } = useProducts();
  console.log(product);

  const DeleteProduct = (id: any) => {
    Swal.fire({
      title: "คุณต้องการลบสินค้าหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ title: "เรียบร้อย", icon: "success" }).then(async () => {
          await agent.Product.removeproduct(id).then(() =>
            dispatch(fetchProduct())
          );
        });
      }
    });
  };
  const handleOnExport = () => {
    // eslint-disable-next-line prefer-const
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(product as Product[]);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "รายงานสินค้า.xlsx");
  };

  const producttest = product?.map((products: any) => {
    return (
      <>
        <tr>
          <th scope="row">
            {" "}
            <img
              src={products.image}
              alt=""
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
          </th>
          <td>{products.name}</td>
          <td>{products.price} บาท</td>
          <td>{products.stock} ชิ้น</td>
          <td>{products.categoryName} </td>
          <td>{products.districtName} </td>
          <td>
            <Button
              onClick={() =>
                navigate("/admin/formproduct", { state: products })
              }
              className=" btn-sm btn-rounded"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={() =>
                navigate(`/admin/product/detail/${products.id}`, {
                  state: products,
                })
              }
              style={{ marginLeft: "2%" }}
              className=" btn-sm btn-rounded"
            >
              <MoreHorizIcon />
            </Button>
            <Button
              danger
              onClick={() => {
                DeleteProduct(products.id);
              }}
              style={{ marginLeft: "2%" }}
              className=" btn-sm btn-rounded"
            >
              <DeleteForeverIcon />
            </Button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <LayoutAdmin>
      <h3>รายการสินค้า</h3>

      <Button
        className=" btn-sm btn-rounded"
        onClick={() => {
          navigate("/admin/formproduct");
        }}
      >
        <AddBusinessIcon /> เพิ่มสินค้า
      </Button>
      <PDFDownloadLink
        document={<PDFComponent product={product as Product[]} />}
        fileName="รายงานสินค้า.pdf"
      >
        <Button
          className=" btn-sm btn-rounded"
          style={{ marginLeft: "0.5%" }}
          danger
        >
          <FilePdfOutlined /> PDF
        </Button>
        <Button
          className=" btn-sm btn-rounded"
          style={{ color: "green", marginLeft: "0.5%" }}
          onClick={handleOnExport}
        >
          <FileExcelOutlined />
          Excel{" "}
        </Button>{" "}
      </PDFDownloadLink>
      <hr />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">สินค้า</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">ประเภทสินค้า</th>
              <th scope="col">ตำบล</th>
              <th scope="col">การจัดการ</th>
            </tr>
          </thead>
          <tbody>{producttest}</tbody>
        </table>
      </div>
      {/* <Pagination defaultCurrent={1} total={50} /> */}
      <br />
    </LayoutAdmin>
  );
};

export default PageProduct;
