import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RiseLoader } from "react-spinners";
import { PresentationLayout } from "../layout-blueprints";
import LeftSidebar from "./default_sidebar/LeftSidebar";
import { connect } from "react-redux";

const Login = lazy(() => import("../app-components/auth/Login"));
const Page404 = lazy(() => import("./default_sidebar/None"));
const DefaultRoutes = (props) => {
  const location = useLocation();
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4 pb-2">
            <RiseLoader color={"#3c44b1"} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-4">
            Lancement de digiPay ...
            <span className="font-size-lg d-block text-dark"></span>
          </div>
        </div>
      </>
    );
  };
  return (
    <AnimatePresence>
      <Suspense fallback={<SuspenseLoading />}>
        <Switch>
          <Redirect exact from="/" to="/Login" />
          <Route path={["/Login"]}>
            <PresentationLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Route path="/Login" component={Login} />
                </motion.div>
              </Switch>
            </PresentationLayout>
          </Route>
          <Route>
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  {!props.auth.isAuthenticated ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Route component={Page404} />
                  )}
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DefaultRoutes);
