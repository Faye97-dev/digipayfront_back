import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Badge } from "reactstrap";

import avatar1 from "../../../assets/images/avatars/av1.png";
import avatar2 from "../../../assets/images/avatars/av2.png";
import avatar3 from "../../../assets/images/avatars/av3.png";
import avatar4 from "../../../assets/images/avatars/av4.png";
import { connect } from "react-redux";
//import { getEmployes } from "../../../actions/employe";
import { showAlert } from "../../../utils/alerts";
import { SkeletonUser } from "../../../utils/SkeletonLoader";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
function EmployeGrid(props) {
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  useEffect(() => {
    //props.getEmployes(showAlert);
  }, []);
  return (
    <>
      <Card className="card-box m-4 py-3 px-2 text-center">
        <div className="my-0">
          <NavLink href="/#" to="/Employe" color="primary">
            <h6 className="font-weight-bold font-size-lg text-left mb-1 text-dark px-3">
              Employés
            </h6>
          </NavLink>

          <div>
            {/*<Button
              href="/#"
              tag={NavLink}
              to="/Employe"
              color="primary"
              className="btn-sm"
            >
              <FontAwesomeIcon
                icon={["far", "user"]}
                className="font-size-xxl text-primary"
              />
              Voir plus
            </Button>*/}
          </div>
          <p className="text-black-50 mb-0"></p>
        </div>
        <div
          className="scroll-area rounded bg-white shadow-overflow"
          style={{ height: "230px" }}
        >
          <PerfectScrollbar>
            <div className="d-flex flex-row flex-wrap justify-content-center">
              {props.employes.loading ? (
                <>
                  <div className="position-relative px-5 py-3">
                    <div className="divider-v divider-v-lg" />
                    <SkeletonUser />
                  </div>
                  <div className="position-relative px-5 py-3">
                    <div className="divider-v divider-v-lg" />
                    <SkeletonUser />
                  </div>
                  <div className="position-relative px-5 py-3">
                    <div className="divider-v divider-v-lg" />
                    <SkeletonUser />
                  </div>
                  <div className="position-relative px-5 py-3">
                    <div className="divider-v divider-v-lg" />
                    <SkeletonUser />
                  </div>
                </>
              ) : demoData.length === 0 ? (
                "Pas d'employes dans cette agence !"
              ) : (
                demoData.map((item) => {
                  return (
                    <div className="position-relative px-5 py-3" key={item.id}>
                      <div className="divider-v divider-v-lg" />
                      <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                        <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                          <div className="rounded-circle overflow-hidden">
                            <img
                              alt="..."
                              className="img-fluid"
                              src={
                                avatars[
                                  Math.floor(Math.random() * avatars.length)
                                ]
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="font-weight-bold mt-1">{item.nom}</div>
                      <div className="font-weight-bold font-size-sm text-black-50">
                        {/*<span>4.8</span>
                    <span className="px-1">|</span>*/}
                        {item.tel + " " + item.email}
                      </div>
                      <div>
                        <Badge
                          className={
                            "px-4 py-1 h-auto text-white" +
                            " border-1 border-" +
                            mapStatusDemoColors[item.role]
                          }
                          color={mapStatusDemoColors[item.role]}
                        >
                          {mapStatusDemoNames[item.role]}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </PerfectScrollbar>
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  employes: state.employe.employes,
});
export default connect(mapStateToProps, {})(EmployeGrid);

const mapStatusDemoColors = {
  "01": "success",
  "02": "info",
};
const mapStatusDemoNames = {
  "01": "Responsable",
  "02": "Employé",
};

const demoData = [
  {
    id: 243,
    role: "01",
    nom: "Med Vadel",
    tel: "47896230",
    adresse: "TVZ",
    email: "med@gmail.com",
  },

  {
    id: 244,
    role: "02",
    nom: "Cheikh Ahmed",
    tel: "20478963",
    adresse: "KSAR",
    email: "cheikh@gmail.com",
  },

  {
    id: 245,
    role: "02",
    nom: "Salma Saleck",
    tel: "33302117",
    adresse: "TVZ",
    email: "salma@gmail.com",
  },

  {
    id: 300,
    role: "02",
    nom: "Brahim Mahmoud",
    tel: "27901410",
    adresse: "Cite plage",
    email: "brahim@gmail.com",
  },

  {
    id: 246,
    role: "02",
    nom: "Samba Dia",
    tel: "20179630",
    adresse: "E-Nord",
    email: "samba@gmail.com",
  },
];
