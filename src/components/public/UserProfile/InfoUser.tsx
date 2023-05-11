import { useAppSelector } from '../../../app/store/configureStore';
import FormUserinfo from './FormUserinfo';

const  InfoUser = () => {
  const { account } = useAppSelector((state) => state.account);
  return (
    <FormUserinfo>
    <div className="tab-content" style={{ marginTop: "10px" }}>
          <div role="tabpanel" className="tab-pane active" id="profile">
            <form>
              <div className="form-group">
                <label htmlFor="inputName">ชื่อผู้ใช้</label>
                
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={account?.name}
                  style={{backgroundColor:"#fff"}}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">อีเมลล์</label>
                <input
                  type="email"
                  className="form-control"
                  readOnly
                  style={{backgroundColor:"#fff"}}
                  value={account?.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">เบอร์โทร</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  style={{backgroundColor:"#fff"}}
                  value={account?.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">ที่อยู่</label>
                <textarea
                  className="form-control"
                  readOnly
                  style={{backgroundColor:"#fff"}}
                  value={account?.address}
                />
              </div>
            </form>
          </div>
        </div>
        </FormUserinfo>
  )
}

export default InfoUser