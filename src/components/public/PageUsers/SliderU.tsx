import { Component } from "react";
import Slider from "react-slick";

export default class SliderU extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      autoplay: true,
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="col-sm-6">
            <div className="item active">
              <div className="col-sm-6">
                <h1>
                  U<span>2</span>T
                </h1>
                <h2>สเปย์ปรับอากาศไล่ยุ่งสูตรใหม่</h2>
                <p>✅ฉีดเดียวได้ทั้งกันยุงและป้องกันเชื้อโรค</p>
                <p>✅ผลิตจากธรรมชาติ ไม่เป็นพิษต่อร่างกาย</p>
                <p>✅ลดการสะสมของเชื้อโรค</p>

                <button type="button" className="btn btn-default get">
                ดูเพิ่มเติม
                </button>
              </div>
              <div className="col-sm-6">
                <img
                  src="https://drive.google.com/uc?id=1udTfKQrYx9ro7d3hZWiSbqh1HmLGxQp1"
                  className="girl img-responsive"
                  alt=""
                />
                <img src="" className="pricing" alt="" />
              </div>
            </div>
          </div>
          <div>
                <img
                  src="https://drive.google.com/uc?id=10FlN6fYoey-eJC4GIaJYeRoIxInTzjW6"
                  style={{height:"550px", width:"100%"}}
                  alt=""
                />
          </div>
          <div className="col-sm-6">
            <div className="item active">
              <div className="col-sm-6">
                <h1>
                  U<span>2</span>T
                </h1>
                <h2>พริกแกงรสเด็ด</h2>
                <p>เพื่อทำเป็นอาหารชนิดใดชนิดหนึ่งตามชนิดของเครื่องปรุงแต่งกลิ่น</p>

                <button type="button" className="btn btn-default get">
                ดูเพิ่มเติม
                </button>
              </div>
              <div className="col-sm-6">
                <img
                  src="https://drive.google.com/uc?id=1Mgp7SUEyh8cDZoVJC_ii3dEk4P9QXk_d"
                  className="girl img-responsive"
                  alt=""
                />
                <img src="" className="pricing" alt="" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
