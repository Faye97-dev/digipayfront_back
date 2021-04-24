import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Row,
  Col,
  Label,
  Card,
} from "reactstrap";

import "../dashboard/formik-demo.css";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";

import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { connect } from "react-redux";
import { updatePassword } from "../../actions/auth";
function UpdatePassword(props) {
  const [modalPassword, setModalPassword] = useState(false);
  const handleModal = () => setModalPassword(!modalPassword);
  return (
    <>
      <ListGroup>
        <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center mr-0 mr-md-4">
            <div>
              <div className="font-weight-bold">Modifier son mot de passe</div>
              <span className="opacity-6 d-block">
                Choisissez un nouveau mot de passe
              </span>
            </div>
          </div>
          <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
            <Button
              size="sm"
              color="warning"
              className="text-nowrap"
              onClick={() => handleModal()}
            >
              Modifier
            </Button>
          </div>
        </ListGroupItem>
      </ListGroup>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={modalPassword}
        toggle={handleModal}
      >
        <Card className="py-4">
          <FormPasswordUpdate handleModal={handleModal} {...props} />
        </Card>
      </Modal>
    </>
  );
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    old_password: Yup.string().required(
      "Veuillez renseigner votre ancien mot de passe !"
    ),

    new_password: Yup.string()
      .required("Veuillez renseigner votre nouveau mot de passe !")
      .min(8, "Votre mot de passe est trop court , minimum 8 lettres !"),
    //.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')

    confirm_password: Yup.string()
      .required("Veuillez confirmer votre mot de passe !")
      .min(8, "Votre mot de passe est trop court , minimum 8 lettres !")
      .oneOf(
        [Yup.ref("new_password"), null],
        "Le mot de passe doit etre identique !"
      ),
  }),
  mapPropsToValues: (props) => ({
    old_password: "",
    new_password: "",
    confirm_password: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };
    //console.log(payload);
    props.updatePassword(props.user.id, payload, setSubmitting, showAlert);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  const [showOldPswd, setShowOldPswd] = useState(false);
  const [showNewPswd, setShowNewPswd] = useState(false);
  const [showConfirmPswd, setShowConfirmPswd] = useState(false);
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-4">
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="old_password">Mot de passe actuel</Label>
            <div className="d-flex align-items-center">
              <Field
                name="old_password"
                type={showOldPswd ? "text" : "password"}
              />
              <div className="pl-2">
                <ShowPassword
                  showPswd={showOldPswd}
                  setShowPswd={setShowOldPswd}
                />
              </div>
            </div>

            {errors.old_password && touched.old_password && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.old_password}
              </div>
            )}
          </Col>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="new_password">Nouveau mot de passe</Label>
            <div className="d-flex align-items-center">
              <Field
                name="new_password"
                type={showNewPswd ? "text" : "password"}
              />
              <div className="pl-2">
                <ShowPassword
                  showPswd={showNewPswd}
                  setShowPswd={setShowNewPswd}
                />
              </div>
            </div>

            {errors.new_password && touched.new_password && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.new_password}
              </div>
            )}
          </Col>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="confirm_password">Confirmation du mot de passe</Label>
            <div className="d-flex align-items-center">
              <Field
                name="confirm_password"
                type={showConfirmPswd ? "text" : "password"}
              />
              <div className="pl-2">
                <ShowPassword
                  showPswd={showConfirmPswd}
                  setShowPswd={setShowConfirmPswd}
                />
              </div>
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.confirm_password}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <div className="d-flex align-items-center pt-4">
              <div className="mr-auto">
                <Button
                  color="danger"
                  disabled={isSubmitting}
                  onClick={props.handleModal}
                  size="md"
                >
                  Annuler
                </Button>
              </div>
              <div className="ml-auto">
                {isSubmitting ? (
                  <ClipLoader color={"var(--success)"} loading={true} />
                ) : (
                  <div>
                    <Button
                      color="success"
                      className="ml-0"
                      type="submit"
                      disabled={isSubmitting}
                      size="md"
                    >
                      Enregistrer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);
const FormPasswordUpdate = (props) => <MyEnhancedForm {...props} />;

function ShowPassword(props) {
  return (
    <Button
      color="secondary"
      outline
      className="d-flex align-items-center justify-content-center border-0 d-30 mr-2 px-4"
      onClick={() => props.setShowPswd(!props.showPswd)}
      title={
        props.showPswd ? "Cacher le mot de passe" : "Afficher le mot de passe"
      }
    >
      {props.showPswd ? (
        <FontAwesomeIcon
          icon={["fas", "eye-slash"]}
          className="display-5 text-primary"
        />
      ) : (
        <FontAwesomeIcon
          icon={["fas", "eye"]}
          className="display-5 text-primary"
        />
      )}
    </Button>
  );
}

//export FormSecretKey;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  //transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  updatePassword,
})(UpdatePassword);
