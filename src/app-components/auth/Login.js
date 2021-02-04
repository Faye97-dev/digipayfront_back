import React, { useState } from "react";

import { Row, Col, Container } from "reactstrap";
import illustration1 from "../../assets/images/illustrations/pack1/authentication.svg";
//import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import FormLogin from "./FormLogin";
import { RiseLoader } from "react-spinners";
const SuspenseLoading = () => {
  return (
    <>
      <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4 pb-2">
          <RiseLoader color={"#3c44b1"} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-4">
          Lancement de digiPay , veuillez patientez svp ...
          <span className="font-size-lg d-block text-dark"></span>
        </div>
      </div>
    </>
  );
};
function Login(props) {
  const [formSubmiting, setFormSubmiting] = useState(false);
  const handleFormLoading = () => setFormSubmiting(true);
  return (
    <>
      {props.auth.isLoading && !formSubmiting ? (
        <SuspenseLoading />
      ) : !props.auth.isAuthenticated ? (
        <>
          <div className="app-wrapper bg-white min-vh-100">
            <div className="app-main min-vh-100">
              <div className="app-content p-0">
                <div className="app-content--inner d-flex align-items-center">
                  <div className="flex-grow-1 w-100 d-flex align-items-center">
                    <div className="bg-composed-wrapper--content py-5">
                      <Container>
                        <Row>
                          <Col lg="6" className="d-flex align-items-center">
                            <div className="divider-v d-none d-lg-block divider-v-md" />
                            <div className="w-100 pr-0 pr-lg-5">
                              <div className="text-black mt-3">
                                <span className="text-center">
                                  <h1 className="display-4 mb-1 font-weight-bold">
                                    Login to your account
                                  </h1>
                                  <p className="font-size-lg mb-0 text-black-50">
                                    We're glad you're working on your app. Login
                                    below to continue.
                                  </p>
                                </span>

                                <div>
                                  <FormLogin
                                    handleFormLoading={handleFormLoading}
                                  />
                                </div>
                                <div className="text-center pt-4 text-black-50">
                                  Don't have an account?{" "}
                                  <a
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Create an Account
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col
                            lg="6"
                            className="d-none d-lg-flex align-items-center"
                          >
                            <img
                              alt="..."
                              className="w-100 mx-auto d-block img-fluid"
                              src={illustration1}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/Dashboard" />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  login,
})(Login);

/*  <FormGroup>
  <label className="font-weight-bold">
    Email address
  </label>
  <Input
    placeholder="yourname@yourmail.com"
    type="email"
  />
</FormGroup>
<div className="form-group mb-4">
  <div className="d-flex justify-content-between">
    <label className="font-weight-bold">
      Password
    </label>
    <a
      href="#/"
      onClick={(e) => e.preventDefault()}
    >
      Forgot password?
    </a>
  </div>
  <Input
    placeholder="Enter your password"
    type="password"
  />
</div>*/
