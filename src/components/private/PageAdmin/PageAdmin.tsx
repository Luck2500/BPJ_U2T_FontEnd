import LayoutAdmin from "./LayoutAdmin";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StoreIcon from "@mui/icons-material/Store";
import { Button, Card, Col, Empty, Row, Space, Statistic } from "antd";
import useProducts from "../../../app/hooks/useProducts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { useEffect, useState } from "react";
import { fetchAccountAll } from "../../../app/store/accountSlice";
import FusionCharts from "fusioncharts";
import useReport from "../../../app/hooks/useReport";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import Chart2 from "./charts/Chart2";
import useDropdownChart from "../../../app/hooks/useDropdownChart";
import useOrder from "../../../app/hooks/useOrder";
import {
  FilePdfOutlined,
  MoneyCollectFilled,
  ScheduleFilled,
} from "@ant-design/icons";
import agent from "../../../app/api/agent";
import { Report } from "../../../app/models/Report";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFOrderConfirm from "./charts/PDFOrderConfirm/PDFOrderConfirm";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

const PageAdmin = () => {
  const { DropdownChartTypeSalesStatistics, typeChartSalesStatistics } =
    useDropdownChart();
  const { datareport } = useReport();

  const [infoReport, setInfoReport] = useState<Report | null>(null);
  const dispatch = useAppDispatch();
  const { product } = useProducts();
  const { orderConfirm } = useOrder();
  const { accountAll, accountAllLoaded } = useAppSelector(
    (state) => state.account
  );
  useEffect(() => {
    if (!accountAllLoaded) dispatch(fetchAccountAll());
  }, [accountAllLoaded, dispatch]);
  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const { data } = await agent.Report.getReport();
    if (data) setInfoReport(data);
  };
  return (
    <LayoutAdmin>
      <section className="text-center">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-5 mb-md-5 mb-lg-0 position-relative">
            <Card bordered={false} style={{ width: "100%", height: "100%" }}>
              <PeopleAltIcon style={{ fontSize: "100px" }} />
              <Statistic
                className="text-primary"
                title="ผู้ใช้งาน"
                value={accountAll?.length}
              />
              <h5>การใช้งาน</h5>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
            </Card>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
            <Card bordered={false} style={{ width: "100%", height: "100%" }}>
              <StoreIcon style={{ fontSize: "100px" }} />
              <Statistic title="รายการสินค้า" value={product?.length} />
              <h5>รายการ</h5>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
            </Card>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
            <Card bordered={false} style={{ width: "100%", height: "100%" }}>
              <ScheduleFilled style={{ fontSize: "107px" }} />
              <Statistic
                title="รายการยื่นยันสั่งซื้อ"
                value={orderConfirm?.length}
              />
              <h5>รายการ</h5>
              <div className="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
            </Card>
          </div>

          <div className="col-lg-3 col-md-6 mb-5 mb-md-0 position-relative">
            <Card bordered={false} style={{ width: "100%", height: "100%" }}>
              <MoneyCollectFilled style={{ fontSize: "107px" }} />

              <Statistic title="รายได้โดยรวม" value={datareport?.totalPrice} />
              <h5>บาท</h5>
            </Card>
          </div>
        </div>
        <Row gutter={24}>
          <Col className="gutter-row center" span={24}>
            {datareport && datareport.sales?.length > 0 ? (
              <>
                <Card
                  title="รายงานสถิติการขาย"
                  extra={
                    <>
                      <PDFDownloadLink
                        document={
                          <PDFOrderConfirm report={datareport as Report} />
                        }
                        fileName="รายงานสินค้า.pdf"
                      >
                        <Button
                          className=" btn-sm btn-rounded"
                          style={{ marginTop: "5px", marginRight: "5px" }}
                          danger
                        >
                          <FilePdfOutlined /> PDF
                        </Button>
                      </PDFDownloadLink>
                      {/* <Button
                        className=" btn-sm btn-rounded"
                        style={{ marginTop: "5px", marginRight:"5px" }}
                        danger
                      >
                        <FilePdfOutlined /> PDF
                      </Button> */}
                      <Space>{DropdownChartTypeSalesStatistics}</Space>
                    </>
                  }
                  className="text-st"
                  bordered={false}
                  style={{ width: "100%" }}
                >
                  <Chart2
                    data={infoReport}
                    ReactFC={ReactFC}
                    toTalPrice={datareport?.totalPrice}
                    typeChart={typeChartSalesStatistics}
                  />
                </Card>
              </>
            ) : (
              <Card
                title="สถิติสินค้า"
                className="text-st"
                bordered={false}
                style={{ width: "100%" }}
              >
                <div style={{ height: "40rem" }} className="center">
                  <Empty className="text-st" description="ไม่มีสถิติสินค้า" />
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </section>
    </LayoutAdmin>
  );
};

export default PageAdmin;
