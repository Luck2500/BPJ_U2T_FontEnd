import { Badge } from "antd";
import { Link } from "react-router-dom";
import useCart from "../../../app/hooks/useCart";
import { ShoppingCartOutlined } from "@ant-design/icons";


export const CartMenu = () => {
  const { itemCount } = useCart();

  return (
    <>
      <Link to="/cart">
        <Badge
          overflowCount={999}
          style={{ padding: "0px", fontFamily: "Sriracha, cursive" }}
          count={itemCount}
          offset={[9, 3]}
        ></Badge>
        <ShoppingCartOutlined /> ตระกร้า
      </Link>
    </>
  );
};
