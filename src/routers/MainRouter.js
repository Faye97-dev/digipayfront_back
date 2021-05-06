import React from "react";
import Routes from "./Routes";
import PremiumRoutes from "./PremiumRoutes";
import DefaultRoutes from "./DefaultRoutes";
import { connect } from "react-redux";
import { CLIENT, ANONYMOUS } from "../utils/choices";
function MainRouter(props) {
  return (
    <div>
      {props.role.value === ANONYMOUS && <DefaultRoutes />}
      {props.role.value !== ANONYMOUS && (
        <>{props.user?.premium ? <PremiumRoutes /> : <Routes />}</>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  role: state.auth.role,
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainRouter);
