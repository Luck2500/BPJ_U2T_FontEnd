import { Checkbox } from "antd";
import { setParams } from "../../../app/store/productSlice";
import { useAppDispatch } from "../../../app/store/configureStore";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import useDistrict from "../../../app/hooks/useDistrict";
import { Link } from "react-router-dom";


function CategoryU() {
  const dispatch = useAppDispatch();
  const { district } = useDistrict();
  const onChange = (e: CheckboxValueType[]) => {
    console.log(e);
    if (e?.length > 0) {
      e.forEach((data) => {
        dispatch(setParams({ searchCategory: data }));
      });
    } else {
      dispatch(setParams({ searchCategory: "" }));
    }
  };
  const onChangeV2 = (e: CheckboxValueType[]) => {
    console.log(e);
    if (e?.length > 0) {
      e.forEach((data) => {
        dispatch(setParams({ searchDistrict: data }));
      });
    } else {
      dispatch(setParams({ searchDistrict: "" }));
    }
  };
  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>หมวดหมู่สินค้า</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-body">
                {/* <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                  <Row gutter={24}>
                    <Col span={24}>
                       <Checkbox style={{float: "right"}} value="ของกิน" />ของกิน
                    </Col>
                    <Col span={8}>
                      <Checkbox value="ของใช้">ของใช้</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group> */}

                <ul>
                  <li>
                    <p>
                      ของกิน{" "}
                      <Checkbox.Group
                        style={{ float: "right" }}
                        onChange={onChange}
                      >
                        <Checkbox style={{ float: "right" }} value="ของกิน" />
                      </Checkbox.Group>
                    </p>
                  </li>
                  <li>
                    <p>
                      ของใช้{" "}
                      <Checkbox.Group
                        style={{ float: "right" }}
                        onChange={onChange}
                      >
                        <Checkbox style={{ float: "right" }} value="ของใช้" />
                      </Checkbox.Group>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="brands_products">
            <h2>ตำบล</h2>
            <div className="brands-name">
              <ul className="nav nav-pills nav-stacked">
                {district?.map((dis: any) => {
                  return (
                    <>
                      <li>
                        <Link to="">
                          <span className="pull-right">
                            <Checkbox.Group
                              style={{ float: "right" }}
                              onChange={onChangeV2}
                            >
                              <Checkbox
                                style={{ float: "right" }}
                                value={dis.name}
                              />
                            </Checkbox.Group>
                          </span>{" "}
                          {dis.name}
                        </Link>
                      </li>{" "}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* <!--/price-range--> */}
        </div>
      </div>
    </>
  );
}

export default CategoryU;
