import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "reactstrap";

import avatar1 from "../../assets/images/avatars/av1.png";
import avatar2 from "../../assets/images/avatars/av2.png";
import avatar3 from "../../assets/images/avatars/av3.png";
import avatar4 from "../../assets/images/avatars/av4.png";
import { connect } from "react-redux";
import { getEmployes } from "../../actions/employe";
import { showAlert } from "../../utils/alerts";

function EmployeGrid(props) {
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  useEffect(() => {
    props.getEmployes(showAlert);
  }, []);
  return (
    <>
      <Card className="card-box mt-5 p-3 text-center">
        <div className="my-3">
          {/*<h6 className="font-weight-bold font-size-lg mb-1 text-black">
            Employes de l'agence
            </h6>*/}
          <p className="text-black-50 mb-0"></p>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {props.employes.loading === false &&
            props.employes.payload.map((item) => {
              return (
                <div
                  className="position-relative px-5 py-3"
                  key={item.username}
                >
                  <div className="divider-v divider-v-lg" />
                  <div className="avatar-icon-wrapper rounded-circle d-80 mx-auto">
                    <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0">
                      <div className="rounded-circle overflow-hidden">
                        <img
                          alt="..."
                          className="img-fluid"
                          src={
                            avatars[Math.floor(Math.random() * avatars.length)]
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="font-weight-bold mt-1">
                    {item.first_name + " " + item.last_name}
                  </div>
                  <div className="font-weight-bold font-size-sm text-black-50">
                    <FontAwesomeIcon
                      icon={["fas", "star"]}
                      className="text-warning mr-1"
                    />
                    <span>4.8</span>
                    <span className="px-1">|</span>
                    {item.tel}
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => ({
  employes: state.employe.employes,
});
export default connect(mapStateToProps, {
  getEmployes,
})(EmployeGrid);
