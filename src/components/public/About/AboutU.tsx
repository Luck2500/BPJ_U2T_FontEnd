import { FacebookFilled, YoutubeFilled } from "@ant-design/icons";
import { Card, Image } from "antd";

function AboutU() {
  return (
    <>
      <div
        style={{ marginTop: "20px" }}
        id="contact-page"
        className="container"
      >
        <div className="bg">
          <div className="row">
            <div className="col-sm-8">
              <div className="contact-form">
                <h2 className="title text-center">เกี่ยวกับเรา</h2>
                <div
                  className="status alert alert-success"
                  style={{ display: "none" }}
                ></div>
                <Card style={{margin:"5px"}}>
                  <div className="form-group col-md-6">
                    <Image
                      width={"100%"}
                      height={"400px"}
                      src="https://drive.google.com/uc?id=11ZvNr1w9cp1Wt02myP5m3DIsLsvp0ZBm"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <p style={{ fontSize: "14px", textAlign: "justify" }}>
                      เว็ปไซต์นี้เป็นการนำสินค้าแสดงผลงานโครงการยกระดับเศรษฐกิจและสังคม
                      รายตำบลแบบบูรณาการ โดยดร.พัชรินรุจา จันทโรนานนท์
                      ที่ปรึกษารัฐมนตรีว่าการกระทรวงการอุดมศึกษา วิทยาศาสตร์
                      วิจัยและนวัตกรรม
                      เป็นประธานเปิดโครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ
                      หรือ U2T เพื่อให้เกิดการจ้างงาน
                      การฟื้นฟูเศรษฐกิจและสังคมที่มีความครอบคลุม โดยมี
                      ดร.ณรงค์เดช รัตนานนท์เสถียร
                      อธิการบดีมหาวิทยาลัยราชภัฏกาญจนบุรี และผู้มีส่วนเกี่ยวข้อง
                      ไลฟ์สไตล์กาญจนบุรี สำหรับกิจกรรมภายในงานประกอบด้วย
                      การจัดแสดงผลงานของผู้เข้าร่วมโครงการ U2T
                      ทั้งหน่วยงานภาครัฐ เอกชน วิสาหกิจชุมชน และท้องถิ่น
                      ผลิตภัณฑ์สินค้า OTOPและผลผลิตทางการเกษตรของตำบลต่างๆ
                      <p>
                        โดย อธิการบดีมหาวิทยาลัยราชภัฏกาญจนบุรี กล่าวว่า โครงการ
                        U2T ภายใต้แนวคิด มหาวิทยาลัย สู่ตำบล
                        สร้างรากแก้วให้กับประเทศ
                        ทางมหาวิทยาลัยราชภัฏกาญจนบุรีดูแลรับผิดชอบทั้งสิ้นจำนวน
                        30 ตำบล ในการให้บริการทางด้านวิชาการ
                        เพื่อให้กลุ่มเป้าหมายได้รับการพัฒนาองค์ความรู้
                        และจัดทำเว็บไซต์ของ โครงการ U2T
                        เพื่อเสริมรายได้ให้กับกลุ่มตำบล
                      </p>
                    </p>
                  </div>
                </Card>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="contact-info">
                <h2 className="title text-center">ติดต่อได้ที่</h2>
                <Card>
                  <address>
                    <p>
                      <span>ที่อยู่ : </span>70 ม.4 ต.หนองบัว อ.เมือง
                      จ.กาญจนบุรี
                    </p>
                    <p>
                      <span>เบอร์โทรติดต่อ : </span>034-534059-60 ต่อ 136
                    </p>
                  </address>
                </Card>
                <div className="social-networks" style={{marginTop:"20px"}}>
                  <h4 className="text-center" style={{color:"orange",fontWeight:"bold"}}>ติดตามช่องทางได้ที่</h4>
                  <Card>
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/KRU.U2T/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{color:"blue"}}
                        >
                          <FacebookFilled size={30} />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.youtube.com/@kanrajabhat"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{color:"red"}}
                        >
                          <YoutubeFilled size={30} />
                        </a>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutU;
