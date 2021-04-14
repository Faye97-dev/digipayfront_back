import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import illustration1 from "../../assets/images/illustrations/pack4/404.svg";

export default function Page404() {
  return (
    <>
      <div className="app-wrapper bg-white">
        <div className="app-main">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper min-vh-50">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <Col
                        lg="7"
                        md="9"
                        className="px-4 px-lg-0 mx-auto text-center text-black"
                      >
                        <img
                          src={illustration1}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        />

                        <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-4 text-black-50">
                          La page que vous recherchez n'existe pas.
                        </h3>
                        <p>
                          C'est sur nous, nous avons probablement déplacé le
                          contenu vers une autre page. veuillez revenir vers la
                          page d'accueil !
                        </p>

                        <div className="d-flex justify-content-center">
                          <Button
                            className="d-block w-70 mt-3"
                            color="first"
                            size="lg"
                            tag={NavLink}
                            to="/Dashboard"
                          >
                            Page d'accueil
                          </Button>
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="app-footer--second pb-4">
                  <span>
                    Développé par
                    <a
                      href="https://www.digitransform.mr"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="digiTransform"
                      className="pl-1"
                    >
                      digiTransform © 2021
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
