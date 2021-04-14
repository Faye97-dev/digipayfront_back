import "../dashboard/formik-demo.css";
import React, { useEffect } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Row, Col, Label, Badge } from "reactstrap";
import { connect } from "react-redux";
import { showAlert } from "../../utils/alerts";
import { SyncLoader } from "react-spinners";
import CountUp from "react-countup";
//import { validUsernameVendor } from "../../actions/withoutRedux/profil";
import { updateVendorProfil } from "../../actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    /*username: Yup.number()
      .min(20000000, " Numero de telephone invalid  !")
      .max(99999999, " Numero de telephone invalid  !")
      .required(" Numero de telephone est obligatoire !"),*/

    first_name: Yup.string().required(
      "Prenom de l'utilisateur est obligatoire !"
    ),
    last_name: Yup.string().required("Nom est de l'utilisateur obligatoire !"),
    email: Yup.string().email("Adresse email invalid !"),
  }),
  mapPropsToValues: (props) => ({
    username: props?.user?.username || "",
    first_name: props?.user?.first_name || "",
    last_name: props?.user?.last_name || "",
    adresse: props?.user?.adresse || "",
    email: props?.user?.email || "",
    // is_active , solde ,tel
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = {
      ...values,
      role: props.user.role,
      tel: props.user.tel,
    };

    /*validUsernameVendor(
      { username: payload.username, id: props.user.id },
      props.access
    ).then((res) => {
      if (res) {
        if (res.valid_username) {
          console.log("success");
          setSubmitting(false);
        } else {
          showAlert(
            "warning",
            "Numéro de téléphone déjà associé a un compte !",
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
          setSubmitting(false);
        }
      }
    });*/
    props.updateVendorProfil(props.user.id, payload, setSubmitting, showAlert);
  },
  displayName: "MyForm",
});

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting } = props;

  return (
    <Form onSubmit={handleSubmit} className="px-5 py-4">
      <Row>
        <Col sm="6" style={{ margin: "12px 0" }}>
          <Badge
            className={
              "px-3 py-1 h-auto text-" +
              "primary" +
              " border-1 border-" +
              "primary font-size-lg"
            }
            color={"neutral-" + "primary"}
          >
            <CountUp
              start={0}
              end={props?.user?.solde}
              duration={5}
              delay={0}
            />
          </Badge>
          <span className="ml-2"> Solde en MRU</span>
        </Col>
      </Row>
      <Row>
        {/* first part */}
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="username">Telephone</Label>
          <Field name="username" type="text" disabled />

          {/*errors.username && touched.username && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.username}
            </div>
          )*/}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="first_name">Prenom</Label>
          <Field name="first_name" type="text" disabled />

          {errors.first_name && touched.first_name && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.first_name}
            </div>
          )}
        </Col>
        <Col xl="4" style={{ margin: "12px 0" }}>
          <Label for="last_name">Nom</Label>
          <Field name="last_name" type="text" disabled />

          {errors.last_name && touched.last_name && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.last_name}
            </div>
          )}
        </Col>

        {/* second part */}
        <Col xl="6" style={{ margin: "12px 0" }}>
          <Label for="adresse">Adresse</Label>
          <Field name="adresse" type="text" />

          {errors.adresse && touched.adresse && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.adresse}
            </div>
          )}
        </Col>
        <Col xl="6" style={{ margin: "12px 0" }}>
          <Label for="email">Email</Label>
          <Field name="email" type="email" />

          {errors.email && touched.email && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {errors.email}
            </div>
          )}
        </Col>
      </Row>

      <>
        <Row>
          <Col xl="12" style={{ margin: "12px 0" }}>
            {isSubmitting ? (
              <SyncLoader color={"var(--primary)"} loading={true} />
            ) : (
              props?.user?.username && (
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Enregistrer les modifications
                </Button>
              )
            )}
          </Col>
        </Row>
      </>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
});

const MyEnhancedForm = connect(mapStateToProps, { updateVendorProfil })(
  formikEnhancer(MyForm)
);

const FormProfilVendor = () => <MyEnhancedForm />;

export default FormProfilVendor;
