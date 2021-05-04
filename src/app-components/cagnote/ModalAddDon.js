import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Modal } from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import { client_add_donation } from "../../actions/cagnote";
import { connect } from "react-redux";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    montant: Yup.number()
      .min(10, " Montant doit etre plus 10 MRU !")
      .max(100000, " Montant ne peut depasser 100000 MRU !")
      .required(" Montant est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    montant: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
    };

    payload["cagnote"] = props.item.cagnote.id;
    payload["client"] = props.user.id;

    props.client_add_donation(
      payload,
      showAlert,
      setSubmitting,
      props.handleModal,
      props.handleModalDetail
    );
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-3 pt-3">
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <Label for="montant">Montant</Label>
            <Field name="montant" type="number" />
          </Col>
          {errors.montant && touched.montant && (
            <div style={{ color: "red", marginTop: ".5rem" }} className="px-3">
              {errors.montant}
            </div>
          )}
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            <div className="d-flex py-1">
              <div className="mr-auto">
                <Button
                  className="btn btn-danger btn-block mb-4 px-2 px-sm-4"
                  onClick={props.handleModal}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
              </div>
              <div className="ml-auto">
                {isSubmitting ? (
                  <>
                    <SyncLoader color={"var(--success)"} loading={true} />
                  </>
                ) : (
                  <Button
                    className="btn btn-success btn-block mb-4 px-2 px-sm-4"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Confirmer
                  </Button>
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
const ModalAddDon = (props) => {
  /*const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);*/
  return (
    <>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={props.modal}
        toggle={props.handleModal}
        contentClassName="border-0 bg-gray"
      >
        <MyEnhancedForm {...props} />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  client_add_donation,
})(ModalAddDon);
