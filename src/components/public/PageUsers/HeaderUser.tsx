import { Fragment } from "react";
import { UserMenu } from "./UserMenu";

const HeaderUser = () => {
  return (
    <Fragment>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="#">
                        <i className="fa fa-phone"></i> 0648078634
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope"></i> 63123250118@kru.ac.th
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="https://www.facebook.com/sutanat.kampool" target="_blank">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
              <div className="logo pull-left"><a><img
                      src="https://drive.google.com/uc?id=1BT8B5WhkKIXyriUvznpKQxHflL-5snzZ"
                      style={{ height: "70px",width:"60px"}}
                      alt=""
                    /></a>
                  <a style={{padding:"10px"}}>
                    <img
                      src="https://drive.google.com/uc?id=1xswTq6VhgPKPXS07gWH3ZuEN9CEsS5-4"
                      style={{ height: "50px",width:"120px" }}
                      alt=""
                    />
                    
                  </a>
                  
                </div>
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                    
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                
              </div>
              <div className="col-sm-8">
                <div className="mainmenu pull-right">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default HeaderUser;
