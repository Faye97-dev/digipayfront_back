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
    type_agence: props.filterValues && (props.filterValues.type_agence || ""),
    online: props.filterValues && (props.filterValues.online || ""),
    commune_code: props.filterValues && (props.filterValues.commune_code || ""),
  }),

  /*handleSubmit: (values, { setSubmitting }) => {
    const data = {
      type_agence: values.type_agence.value,
      online: values.online.value,
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
      type_agence: values.type_agence.value,
      online: values.online.value,
      "commune#commune_code": values.commune_code.value,
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
              label={props.filtersOptions.type_agence.label}
              name={props.filtersOptions.type_agence.name}
              option={props.filtersOptions.type_agence.content}
              value={values.type_agence}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.type_agence}
              touched={touched.type_agence}
            />
          </Col>
        </Row>

        <Row>
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
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label={props.filtersOptions.commune_code.label}
              name={props.filtersOptions.commune_code.name}
              option={props.filtersOptions.commune_code.content}
              value={values.commune_code}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.commune_code}
              touched={touched.commune_code}
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
