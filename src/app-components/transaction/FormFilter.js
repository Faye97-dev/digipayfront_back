import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Form } from "formik";
import { Button, Row, Col } from "reactstrap";
import Select from "react-select";

import { Filter } from "react-feather";

const formikEnhancer = withFormik({
  /*validationSchema: Yup.object().shape({
    operateur: Yup.object().required("L'operateur est obligatoire !"),
    carte: Yup.object().required("La carte est obligatoire !"),
    tel: Yup.number()
      .min(0, "Numero de telephone invalid  !")
      .max(100000000, "Numero de telephone invalid  !")
      .required("Numero de telephone est obligatoire !"),
  }),*/
  mapPropsToValues: (props) => ({
    type_transaction:
      props.filterValues && (props.filterValues.type_transaction || ""),
    //online: props.filterValues && (props.filterValues.online || ""),
    status: props.filterValues && (props.filterValues.status || ""),
  }),

  /*handleSubmit: (values, { setSubmitting }) => {
    const data = {
      type_transaction: values.type_transaction.value,
      //online: values.online.value,
    };
    
    setSubmitting(false);
  },*/
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    //handleSubmit,
    //handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
  } = props;

  const customSubmit = (e) => {
    e.preventDefault();
    const data = {
      type_transaction: values.type_transaction.value,
      //online: values.online.value,
      "transaction#status": values.status.value,
    };
    props.handleFilter(data);
    setSubmitting(false);
  };
  return (
    <>
      <Form onSubmit={customSubmit}>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label={props.filtersOptions.type_transaction.label}
              name={props.filtersOptions.type_transaction.name}
              option={props.filtersOptions.type_transaction.content}
              value={values.type_transaction}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.type_transaction}
              touched={touched.type_transaction}
            />
          </Col>
        </Row>

        {/*<Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label={props.filtersOptions.online.label}
              name={props.filtersOptions.online.name}
              option={props.filtersOptions.online.content}
              value={values.online}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.online}
              touched={touched.online}
            />
          </Col>
       </Row>*/}

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label={props.filtersOptions.status.label}
              name={props.filtersOptions.status.name}
              option={props.filtersOptions.status.content}
              value={values.status}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.status}
              touched={touched.status}
            />
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <div className="d-flex align-items-center justify-content-center">
              <Button color="primary" type="submit" disabled={isSubmitting}>
                <Filter className=" pr-2 w-10" />
                Filtrer
              </Button>
            </div>
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

const FormFilter = (props) => (
  <MyEnhancedForm
    handleFilter={props.handleFilter}
    filterValues={props.filterValues}
    filtersOptions={props.filtersOptions}
  />
);
export default FormFilter;
