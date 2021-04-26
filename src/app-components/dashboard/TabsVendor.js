import React, { useState, useEffect } from "react";

import clsx from "clsx";
import {
  Row,
  Col,
  Card,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Modal,
  Badge,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

import FormVendor from "./FormVendor";
import FormVendorWithdraw from "./FormVendorWithdraw";
import FormVendorPayback from "./FormVendorPayback";
import FormVendorPay from "./FormVendorPay";
import QRCode from "qrcode";
import { connect } from "react-redux";
import { getNotifications } from "../../actions/notification";
import { showAlert } from "../../utils/alerts";
function TabsVendor(props) {
  useEffect(() => {
    props.getNotifications(showAlert);
  }, []);
  return (
    <>
      <XlFormat {...props} />
      <SmallFormat {...props} />
    </>
  );
}

function CodeGenerator(props) {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [modalQrCode, setModalQrCode] = useState(false);
  const [showCodePaiement, setShowCodePaiement] = useState(null);
  const handleModal = (res = null) => {
    setImageUrl(res);
    setModalQrCode(!modalQrCode);
  };
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async (text) => {
    var opts = {
      //errorCorrectionLevel: 'H',
      type: "image/jpeg",
      quality: 1,
      margin: 0.5,
      color: {
        dark: "#3c44b1",
        //light: "#FFBF60FF",
      },
    };
    let result;
    try {
      const response = await QRCode.toDataURL(text, opts);
      handleModal(response);
      result = response;
    } catch (error) {
      console.log(error);
      result = null;
    }
    return result;
  };

  return (
    <>
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Générer un code de paiement
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className=" my-5">
                  <FormVendor
                    submit="Générer"
                    generateQrCode={generateQrCode}
                    setShowCodePaiement={setShowCodePaiement}
                    handleModal={handleModal}
                  />

                  <Modal
                    zIndex={2000}
                    centered
                    size="sm"
                    isOpen={modalQrCode}
                    toggle={handleModal}
                    contentClassName="border-0"
                  >
                    <div className="p-2">
                      {imageUrl ? (
                        /*<a href={imageUrl} download={`QrCode${Date.now()}`}>*/
                        <>
                          <img src={imageUrl} alt="img" width="100%" />
                          <p className="text-black p-1 m-0 text-center font-size-xl font-weight-normal">
                            Code de paiement :
                            <Badge color="primary" className=" mx-2 px-2 ">
                              <span className="text-white font-size-xl ">
                                {showCodePaiement}
                              </span>
                            </Badge>
                          </p>
                        </>
                      ) : (
                        <p className="text-black p-1 m-0 text-center font-size-xl font-weight-normal">
                          Code de paiement :
                          <Badge color="primary" className=" mx-2 px-2 ">
                            <span className="text-white font-size-xl ">
                              {showCodePaiement}
                            </span>
                          </Badge>
                        </p>
                      )}
                    </div>
                  </Modal>
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
}

function SmallFormat(props) {
  const [activeTab2, setActiveTab2] = useState("2");

  const toggle2 = (tab) => {
    if (activeTab2 !== tab) setActiveTab2(tab);
  };

  const [activeTab3, setActiveTab3] = useState("1");

  const toggle3 = (tab) => {
    if (activeTab3 !== tab) setActiveTab3(tab);
  };

  return (
    <div className="d-block d-xl-none">
      <CodeGenerator {...props} />
      {/* second tabs */}
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab2 === "2" })}
                    onClick={() => {
                      toggle2("2");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Payer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab2 === "1" })}
                    onClick={() => {
                      toggle2("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retirer</span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab2}>
              <TabPane tabId="2">
                <div className=" my-5">
                  <FormVendorPay />
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className="my-5">
                  <FormVendorWithdraw />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      {/* third tabs */}
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab3 === "1" })}
                    onClick={() => {
                      toggle3("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Rembourser
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab3}>
              <TabPane tabId="1">
                <div className="my-5">
                  <FormVendorPayback submit="Demander" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}

function XlFormat(props) {
  const [activeTab, setActiveTab] = useState("3");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="d-none d-xl-block">
      <CodeGenerator {...props} />
      <Row className="py-4">
        <Col lg="12">
          <Card className="shadow-xxl px-3">
            <div className="nav-tabs-primary tabs-animated tabs-animated-line">
              <Nav tabs justified className="justify-content-center">
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Retirer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">Payer</span>
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap
                    className={clsx({ active: activeTab === "4" })}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    <span className="px-3 py-2 font-weight-bold">
                      Rembourser
                    </span>
                  </NavLinkStrap>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="3">
                <div className=" my-5">
                  <FormVendorWithdraw />
                </div>
              </TabPane>
              <TabPane tabId="1">
                <div className=" my-5">
                  <FormVendorPay />
                </div>
              </TabPane>
              <TabPane tabId="4">
                <div className=" my-5">
                  <FormVendorPayback submit="Demander" />
                </div>
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { getNotifications })(TabsVendor);
