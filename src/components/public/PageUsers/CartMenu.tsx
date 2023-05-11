import { Badge } from "antd";
import { Link } from "react-router-dom";
import useCart from "../../../app/hooks/useCart";




export const CartMenu = () => {
    const { itemCount } = useCart();
    
    
    return<>
    <Link to="/cart" >
        <Badge  overflowCount={999} style={{padding:"0px",fontFamily: "Sriracha, cursive"}} count={itemCount} offset={[9, 3]}></Badge>
            <i className="fa fa-shopping-cart"></i> ตระกร้า
    </Link>
    
    </>
}