import "../dashboard/formik-demo.css";
import React from "react";
import { withFormik, Form } from "formik";
import { Button, Row, Col } from "reactstrap";
import Select from "react-select";

import { Save } from "react-feather";

const formikEnhancer = withFormik({
  mapPropsToValues: (props) => ({
    rowsPerPage: props.defaultRowsPerPage && (props.defaultRowsPerPage || ""),
  }),
  displayName: "MyForm",
});

const MyForm = (props) => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
    handleRowsPerPage,
  } = props;

  const customSubmit = (e) => {
    e.preventDefault();
    const data = {
      rowsPerPage: values.rowsPerPage.value,
    };
    handleRowsPerPage(data);
    setSubmitting(false);
  };
  return (
    <>
      <Form onSubmit={customSubmit}>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label={props.rowsPerPageOptions.rowsPerPage.label}
              name={props.rowsPerPageOptions.rowsPerPage.name}
              option={props.rowsPerPageOptions.rowsPerPage.content}
              value={values.rowsPerPage}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.rowsPerPage}
              touched={touched.rowsPerPage}
            />
          </Col>
        </Row>

        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <div className="d-flex align-items-center justify-content-center">
              <Button color="primary" type="submit" disabled={isSubmitting}>
                <Save className=" pr-2 w-10" />
                Confimer
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

const FormRows = (props) => (
  <MyEnhancedForm
    handleRowsPerPage={props.handleRowsPerPage}
    defaultRowsPerPage={props.defaultRowsPerPage}
    rowsPerPageOptions={props.rowsPerPageOptions}
  />
);
export default FormRows;
