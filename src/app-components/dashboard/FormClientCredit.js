import "./formik-demo.css";
import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import Select from "react-select";

import { showAlert } from "../../utils/alerts";
import { achatCredit_clientDigipay } from "../../actions/transaction";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    //operateur: Yup.object().required("L'operateur est obligatoire !"),
    carte: Yup.object().required("La carte est obligatoire !"),
    tel: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Numero de telephone est obligatoire !"),
  }),
  mapPropsToValues: (props) => ({
    //operateur: "",
    carte: "",
    tel: 45121830,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
      carte: { ...values.carte },
      //operateur: { ...values.operateur },
    };
    payload.montant = parseInt(payload.carte.value);
    payload.client = props.user.id;

    if (
      payload.tel.toString().trim().startsWith("4") ||
      payload.tel.toString().trim().startsWith("3") ||
      payload.tel.toString().trim().startsWith("2")
    ) {
      //console.log("sucess! ", payload);
      props.achatCredit_clientDigipay(payload, showAlert);
    } else {
      showAlert(
        "warning",
        "Aucun de nos opérateurs ne prend en charge ce numéro de téléphone !",
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      );
    }
    setSubmitting(false);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  const [operateur, tagColor] = values.tel.toString().trim().startsWith("4")
    ? ["Mauritel", "warning"]
    : values.tel.toString().trim().startsWith("3")
    ? ["Mattel", "info"]
    : values.tel.toString().trim().startsWith("2")
    ? ["Chinguitel", "primary"]
    : ["", ""];
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <Label for="tel">
              Téléphone
              <Badge className="mx-2 px-2" color={tagColor}>
                {operateur}
              </Badge>
            </Label>
            <Field name="tel" type="number" />

            {errors.tel && touched.tel && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.tel}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Carte"
              name="carte"
              option={optionsCarte}
              value={values.carte}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.carte}
              touched={touched.carte}
            />
          </Col>
          {/* <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Operateur"
              name="operateur"
              option={optionsOperateur}
              value={values.operateur}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.operateur}
              touched={touched.operateur}
            />
            </Col>*/}
        </Row>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <>
              {isSubmitting || props.transactions.loading ? (
                <SyncLoader color={"var(--primary)"} loading={true} />
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || props.transactions.loading}
                >
                  Acheter
                </Button>
              )}
            </>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const optionsCarte = [
  { value: "10", label: "10 MRU" },
  { value: "20", label: "20 MRU" },
  { value: "50", label: "50 MRU" },
  { value: "100", label: "100 MRU" },
  { value: "200", label: "200 MRU" },
  { value: "500", label: "500 MRU" },
  { value: "1000", label: "1000 MRU" },
];

const optionsOperateur = [
  { value: "mauritel", label: "Mauritel" },
  { value: "mattel", label: "Matttel" },
  { value: "chinguitel", label: "Chinguitel" },
];

class MySelect extends React.Component {
  handleChange = (item) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, item);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div style={{ margin: "9px 0" }}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <Select
          id={this.props.name}
          options={this.props.option}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          placeholder="Selectionner ..."
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
}
const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientCredit = (props) => <MyEnhancedForm {...props} />;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { achatCredit_clientDigipay })(
  FormClientCredit
);
