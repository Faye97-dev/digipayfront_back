import "./formik-demo.css";
import React, { useState, useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import Select from "react-select";

import { showAlert } from "../../utils/alerts";
import { achatCredit_clientDigipay } from "../../actions/transaction";
import { SyncLoader } from "react-spinners";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getFacturiersList,
  getFactureSomelecByReference,
} from "../../actions/async";
import { SOMELEC } from "../../utils/choices";
import ModalSomelecPay from "./Facturiers/ModalSomelecPay";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    //operateur: Yup.object().required("L'operateur est obligatoire !"),
    facturier: Yup.object().required("La facturier est obligatoire !"),
    service: Yup.object().required("Veuillez choisir un service !"),
    reference: Yup.string()
      .required("La référence est obligatoire !")
      .max(25, "Nombre de caractères limite dépassé !"),
  }),
  mapPropsToValues: (props) => ({
    //operateur: "",
    //multi_services: false,
    facturier: "",
    reference: "",
    service: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      facturier: values.facturier.value,
      service: values.service.value,
    };

    if (props.currentFacturierName === SOMELEC) {
      getFactureSomelecByReference(payload.reference, showAlert).then((res) => {
        if (res) {
          const keys = Object.keys({ ...res });
          if (keys.includes("message")) {
            showAlert(
              "warning",
              res.message,
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
          } else {
            props.handleModalSomelec({
              ...payload,
              ...res,
            });
          }
        }
        setSubmitting(false);
        resetForm();
        props.resetState();
      });
    } else {
      showAlert(
        "warning",
        "ce facturier n'est pas disponible pour le moment !",
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      );

      setSubmitting(false);
      resetForm();
      props.resetState();
    }
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

  const [facturierList, setFacturierList] = useState([]);
  const [loadingFacturier, setLoadingFacturier] = useState(false);

  useEffect(() => {
    setLoadingFacturier(true);
    getFacturiersList(showAlert, props.access).then((res) => {
      if (res) {
        setFacturierList(res);
      }
      setLoadingFacturier(false);
    });
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="6" md="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Facturier"
              name="facturier"
              option={
                loadingFacturier === false &&
                facturierList.map((item) => {
                  return {
                    value: item.id,
                    label:
                      item.first_name +
                      " | " +
                      item.services.map((s) => ` ${s.service} `),
                  };
                })
              }
              choices={true}
              choicesList={facturierList}
              setChoices={props.setServiceList}
              setFacturier={props.setCurrentFacturierName}
              //
              value={values.facturier}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.facturier}
              touched={touched.facturier}
            />
          </Col>
          {values.facturier !== "" && props.serviceList.length !== 0 && (
            <Col xl="6" md="12" style={{ margin: "9px 0" }}>
              <MySelect
                label="Services"
                name="service"
                option={props.serviceList.map((item) => {
                  return {
                    value: item.service, //item.id,
                    label: item.service,
                  };
                })}
                value={values.service}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.service}
                touched={touched.service}
              />
            </Col>
          )}

          <Col
            xl={
              values.facturier !== "" && props.serviceList.length !== 0
                ? "12"
                : "6"
            }
            md="12"
            style={{ margin: "13px 0" }}
          >
            <Label for="reference">
              Référence
              {/*<Badge className="mx-2 px-2" color={tagColor}>
                {operateur}
                </Badge>*/}
            </Label>
            <Field name="reference" type="text" />

            {errors.reference && touched.reference && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {errors.reference}
              </div>
            )}
          </Col>
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
                  Payer
                </Button>
              )}
            </>
          </Col>
        </Row>
      </Form>
    </>
  );
};

class MySelect extends React.Component {
  handleChange = (item) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, item);

    if (this.props.choices) {
      // reset service select
      this.props.onChange("service", "");
      this.props.onBlur("service", false);

      const currentChoice = this.props.choicesList.filter(
        (obj) => obj.id === item.value
      );

      if (currentChoice.length === 1) {
        this.props.setFacturier(currentChoice[0].first_name);
        this.props.setChoices(currentChoice[0].services);

        if (!currentChoice[0].many) {
          this.props.onChange("service", {
            value: currentChoice[0].services[0].service,
            label: currentChoice[0].services[0].service,
          });
        }
      }
    }
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

const FormClientFacturePay = (props) => {
  const [serviceList, setServiceList] = useState([]);
  const [currentFacturierName, setCurrentFacturierName] = useState(null);
  const resetState = () => {
    setCurrentFacturierName(null);
    setServiceList([]);
  };

  // modal somelec
  const [modalSomelec, setModalSomelec] = useState(false);
  const [somelecFactureInfo, setSomelecFactureInfo] = useState(null);
  const handleModalSomelec = (item) => {
    setModalSomelec(!modalSomelec);
    setSomelecFactureInfo(item);
  };

  const handleModalOperationDone = () => {
    setSomelecFactureInfo(null);
  };

  return (
    <>
      <MyEnhancedForm
        {...props}
        serviceList={serviceList}
        setServiceList={setServiceList}
        currentFacturierName={currentFacturierName}
        setCurrentFacturierName={setCurrentFacturierName}
        resetState={resetState}
        //
        handleModalSomelec={handleModalSomelec}
      />

      <ModalSomelecPay
        modalSomelec={modalSomelec}
        handleModalSomelec={handleModalSomelec}
        handleModalOperationDone={handleModalOperationDone}
        item={somelecFactureInfo}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { achatCredit_clientDigipay })(
  FormClientFacturePay
);
