import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RiseLoader } from "react-spinners";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return (
          <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
            <div className="d-flex align-items-center flex-column px-4 pb-2">
              <RiseLoader color={"#3c44b1"} loading={true} />
            </div>
            <div className="text-vlack font-size-xl text-center pt-4">
              Veuillez patientez svp .....
              <span className="font-size-lg d-block text-dark"></span>
            </div>
          </div>
        );
      } else if (!auth.isAuthenticated) {
        return <Redirect to="/Login"></Redirect>;
      } else if (auth.isAuthenticated) {
        return <Component {...props}></Component>;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
