
import "../PageUsers/Header.css";
import ShoppingU from "./ShoppingU";

function HomeShopU() {
  return (
    <>
      <section id="advertisement">
        <div
          className="container-fluid mb-1"
          style={{ backgroundColor: "#f4daf9" }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "200px" }}
          >
            <h1 style={{textAlign:"center"}} className="center">สินค้าทั้งหมด</h1>
          </div>
        </div>
      </section>
      <ShoppingU/>
    </>
  );
}

export default HomeShopU;
