import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2> Auth loading ...... </h2>;
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
