import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RiseLoader } from "react-spinners";
import PrivateRoute from "../utils/PrivateRoute";
// Layout Blueprints

import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout,
} from "../layout-blueprints";

// Example Pages

import PageError505 from "../example-pages/PageError505";

/**/
const importDashboardByRole = (role) => {
  let component = (
    <>
      <span>Bad request</span>
    </>
  );
  if (role === "RESPONSABLE_AGENCE") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardResponsable")
    );
  } else if (role === "EMPLOYE_AGENCE") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardEmploye")
    );
  } else if (role === "CLIENT") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardClient")
    );
  } else if (role === "VENDOR") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardVendor")
    );
  } else if (role === "SYSADMIN") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardSysAdmin")
    );
  } else if (role === "AGENT_COMPENSATION") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardCompensation")
    );
  } else if (role === "FACTURIER") {
    component = lazy(() =>
      import("../app-components/dashboard/DashboardFacturier")
    );
  }

  return component;
};

const importTransactionByRole = (role) => {
  let component = (
    <>
      <span>Bad request</span>
    </>
  );
  if (role === "RESPONSABLE_AGENCE" || role === "EMPLOYE_AGENCE") {
    component = lazy(() => import("../app-components/transaction/Transaction"));
  } else if (role === "CLIENT") {
    component = lazy(() =>
      import("../app-components/transaction/TransactionClient")
    );
  } else if (role === "VENDOR") {
    component = lazy(() =>
      import("../app-components/transaction/TransactionVendor")
    );
  } else if (role === "AGENT_COMPENSATION") {
    component = lazy(() =>
      import("../app-components/transaction/TransactionCompensation")
    );
  }
  return component;
};
const Agence = lazy(() => import("../app-components/agence/Agence"));
const Employe = lazy(() => import("../app-components/employe/Employe"));
const Mesenger = lazy(() => import("../app-components/mesenger/Mesenger"));
const Recharge = lazy(() => import("../app-components/recharge/FormBanquaire"));
const Login = lazy(() => import("../app-components/auth/Login"));
const Compensation = lazy(() =>
  import("../app-components/compensation/Compensation")
);
/*const Statistique = lazy(() =>
  import("./app-components/statistiques/Statistique")
);*/
const Profil = lazy(() => import("../app-components/profil/Profil"));
const Notification = lazy(() =>
  import("../app-components/notification/Notification")
);
const Contact = lazy(() => import("../app-components/contact/Contact"));
const Cagnote = lazy(() => import("../app-components/cagnote/Cagnote"));
const PageLoginBasic = lazy(() => import("../example-pages/PageLoginBasic"));

const Page404 = lazy(() => import("../app-components/pageError/Page404"));
//const PageProfile = lazy(() => import("./example-pages/PageProfile"));

/* SysAdmin Routes */
const SysAdmin_TransfertAgence = lazy(() =>
  import("../app-components/sysadmin/transfert_agence/TransfertAgence")
);
const SysAdmin_Transfert = lazy(() =>
  import("../app-components/sysadmin/transfert/Transfert")
);
const SysAdmin_TransfertCagnote = lazy(() =>
  import("../app-components/sysadmin/transfert_cagnote/TransfertCagnote")
);
const SysAdmin_Compensation = lazy(() =>
  import("../app-components/sysadmin/compensation/Compensation")
);

const SysAdmin_Agence = lazy(() =>
  import("../app-components/sysadmin/agence/Agence")
);
const SysAdmin_Agent = lazy(() =>
  import("../app-components/sysadmin/agent/Agent")
);
const SysAdmin_Client = lazy(() =>
  import("../app-components/sysadmin/client/Client")
);
const SysAdmin_Vendor = lazy(() =>
  import("../app-components/sysadmin/vendor/Vendor")
);

const SysAdmin_Administrateur = lazy(() =>
  import("../app-components/sysadmin/administrateur/Administrateur")
);

const SysAdmin_RechargeCredit = lazy(() =>
  import("../app-components/sysadmin/recharge_credit/RechargeCredit")
);

const SysAdmin_Notification = lazy(() =>
  import("../app-components/sysadmin/notification/Notification")
);
const Routes = (props) => {
  const location = useLocation();
  const Dashboard = importDashboardByRole(props.role);
  const Transaction = importTransactionByRole(props.role);
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

  const RoutesSidebar = [
    {
      component: Dashboard,
      link: "/Dashboard",
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
        "FACTURIER",
      ],
    },
    {
      component: Agence,
      link: "/Agence",
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    {
      component: Employe,
      link: "/Employe",
      roles: ["RESPONSABLE_AGENCE"],
    },
    {
      component: Transaction,
      link: "/Transaction",
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        //"AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    {
      component: Recharge,
      link: "/RechargeBanquaire",
      roles: ["CLIENT"],
    },
    {
      component: Compensation,
      link: "/Compensation",
      roles: ["RESPONSABLE_AGENCE", "AGENT_COMPENSATION"],
    },
    /*{
      component: Statistique,
      link: "/Statistique",
      roles: [
        "SYSADMIN",
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },*/
    {
      component: Notification,
      link: "/Notification",
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
        "FACTURIER",
      ],
    },
    {
      component: Contact,
      link: "/Contact",
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
    {
      component: Cagnote,
      link: "/Cagnote",
      roles: ["CLIENT"],
    },

    /*  SysAdmin Routes */
    {
      component: SysAdmin_TransfertAgence,
      link: "/Transaction/Agence",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Transfert,
      link: "/Transaction/Direct",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_TransfertCagnote,
      link: "/Transaction/Cagnotte",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Compensation,
      link: "/Compensation",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Agence,
      link: "/Utilisateur/Agence",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Agent,
      link: "/Utilisateur/Trésorier",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Client,
      link: "/Utilisateur/Client",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Vendor,
      link: "/Utilisateur/Commerçant",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Administrateur,
      link: "/Administrateur",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_RechargeCredit,
      link: "/RechargeTéléphonique",
      roles: ["SYSADMIN"],
    },

    {
      component: SysAdmin_Notification,
      link: "/Notification",
      roles: ["SYSADMIN"],
    },
  ];

  const PathSidebar = RoutesSidebar.filter((item) =>
    item.roles.includes(props.role)
  ).map((item) => {
    return item.link; //
  });
  const RoutesCollapsed = [
    {
      component: { Mesenger },
      link: "/Chat",
      roles: [
        "EMPLOYE_AGENCE",
        "RESPONSABLE_AGENCE",
        "AGENT_COMPENSATION",
        "CLIENT",
        "VENDOR",
      ],
    },
  ];

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
          <Route
            path={
              /*[
              "/Dashboard",
              "/Transaction",
              "/Agence",
              "/Employe",
              "/RechargeBanquaire",
              "/Compensation",
              "/Statistique",
              "/Notification",
              "/Contact",
            ]*/
              PathSidebar
            }
          >
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  {RoutesSidebar.filter((item) =>
                    item.roles.includes(props.role)
                  ).map((item, index) => {
                    return (
                      <PrivateRoute
                        key={index}
                        path={item.link}
                        component={item.component}
                      />
                    );
                  })}
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
          <Route path={["/Profil"]}>
            <CollapsedSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  {/*RoutesCollapsed.filter((item) =>
                    item.roles.includes(props.role)
                  ).map((item, index) => {
                    return (
                      <Route
                        key={index}
                        path={item.link}
                        component={item.component}
                      />
                    );
                  })*/}
                  {/*<PrivateRoute path="/Chat" component={Mesenger} />*/}
                  <PrivateRoute path="/Profil" component={Profil} />
                </motion.div>
              </Switch>
            </CollapsedSidebar>
          </Route>
          <Route path={[]}>
            <MinimalLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PrivateRoute
                    path="/PageLoginBasic"
                    component={PageLoginBasic}
                  />
                </motion.div>
              </Switch>
            </MinimalLayout>
          </Route>

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role.value,
});

export default connect(mapStateToProps)(Routes);
