import React from "react";

import {
  Card,
  ListGroup,
  ListGroupItem,
  Alert,
  Row,
  Col,
  Modal,
} from "reactstrap";

import { useDropzone } from "react-dropzone";
import { UploadCloud, Check, X } from "react-feather";

import "../../dashboard/formik-demo.css";

import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { SyncLoader } from "react-spinners";

export default function FormUpload(props) {
  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: ".csv,.xlsx",
  });

  const files = acceptedFiles.map((file) => (
    <ListGroupItem
      className="font-size-sm px-3 py-2 text-primary d-flex justify-content-between align-items-center"
      key={file.path}
    >
      <span>{file.path}</span>{" "}
      <span className="badge badge-pill bg-neutral-warning text-warning">
        {file.size} bytes
      </span>
    </ListGroupItem>
  ));

  return (
    <>
      <Modal
        zIndex={2000}
        centered
        size="lg"
        isOpen={props.modalAjoutCredit}
        toggle={props.handleModalAjoutCredit}
        contentClassName="border-0 bg-gray"
      >
        <Row>
          <Col xl="12">
            <Card className="m-4 p-4">
              <FormOperateur />
              <div className="dropzone">
                <div
                  {...getRootProps({ className: "dropzone-upload-wrapper" })}
                >
                  <input {...getInputProps()} />
                  <div className="dropzone-inner-wrapper">
                    {isDragAccept && (
                      <div>
                        <div className="d-100 btn-icon mb-3 hover-scale-lg bg-success shadow-success-sm rounded-circle text-white">
                          <Check className="d-50" />
                        </div>
                        <div className="font-size-sm text-success">
                          Tous les fichiers seront téléchargés !
                        </div>
                      </div>
                    )}
                    {isDragReject && (
                      <div>
                        <div className="d-100 btn-icon mb-3 hover-scale-lg bg-danger shadow-danger-sm rounded-circle text-white">
                          <X className="d-50" />
                        </div>
                        <div className="font-size-sm text-danger">
                          Certains fichiers seront rejetés !
                        </div>
                      </div>
                    )}
                    {!isDragActive && (
                      <div>
                        <div className="d-100 btn-icon mb-3 hover-scale-lg bg-white shadow-light-sm rounded-circle text-primary">
                          <UploadCloud className="d-50" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="font-weight-bold my-4 text-uppercase text-dark font-size-sm text-center">
                  Fichiers téléchargés
                </div>
                {files.length <= 0 && (
                  <div className="text-primary text-center font-size-sm">
                    Les fichiers téléchargés apparaîtront ici !
                  </div>
                )}
                {files.length > 0 && (
                  <div>
                    <Alert color="success" className="text-center mb-3">
                      Vous avez téléchargé <b>{files.length}</b> fichiers !
                    </Alert>
                    <ListGroup className="font-size-sm">{files}</ListGroup>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    operateur: Yup.object().required(
      "Veuillez selectionnner un opérateur téléphonique !"
    ),
  }),
  mapPropsToValues: (props) => ({
    operateur: "",
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
      operateur: { ...values.operateur },
    };
    console.log(payload);
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

    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <MySelect
              label="Opérateur Téléphonique"
              name="operateur"
              option={optionsOperateur}
              value={values.operateur}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.operateur}
              touched={touched.operateur}
            />
          </Col>
        </Row>
        {/*<Row>
          <Col xl="12" style={{ margin: "9px 0" }}>
            <>
              {isSubmitting ? (
                <SyncLoader color={"var(--primary)"} loading={true} />
              ) : (
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Acheter
                </Button>
              )}
            </>
          </Col>
        </Row>*/}
      </Form>
    </>
  );
};

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

const FormOperateur = (props) => <MyEnhancedForm {...props} />;
