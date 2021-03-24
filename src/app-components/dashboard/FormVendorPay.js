import "./formik-demo.css";
import React, { useState, useRef } from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Row,
  Col,
  Label,
  Badge,
  Card,
  CardBody,
  Modal,
} from "reactstrap";
import { showAlert } from "../../utils/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkCodePayement_Vendor } from "../../actions/async";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { addPayement_Vendor } from "../../actions/transaction";
import QrReader from "react-qr-reader";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    code: Yup.string().required(
      "Code de paiement ou Numero de facture est obligatoire !"
    ),
  }),
  mapPropsToValues: (props) => ({
    code: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    payload["vendorId"] = props.user.id;
    checkCodePayement_Vendor(payload, showAlert, props.access).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          props.handleItem(res);
          props.showDivInfo();
        }
      }
      setSubmitting(false);
      resetForm();
    });
  },
  displayName: "MyForm",
});

const ModalScanQrCode = (props) => {
  // Qr scan file ...
  const [scanResultWebCam, setScanResultWebCam] = useState(null);
  const handleErrorWebCam = (error) => {
    console.log(error);
    showAlert(
      "warning",
      "Pas de camera détecter !",
      <FontAwesomeIcon icon={["far", "question-circle"]} />
    );
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
      handleModal();
      processBeforePayement(result);
    }
  };

  // Qr reader file ...
  const [scanResultFile, setScanResultFile] = useState(null);
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    console.log("scaned qr code ...", result);
    if (result) {
      setScanResultFile(result);
      processBeforePayement(result);
    } else {
      showAlert(
        "warning",
        "Le QrCode fourni est inavalid !",
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      );
    }
  };
  const onScanFile = () => {
    //handleModal();
    setScanResultFile(null);
    qrRef.current.openImageDialog();
  };

  // modal data
  const [modalQrCode, setModalQrCode] = useState(false);
  const handleModal = () => {
    setModalQrCode(!modalQrCode);
    setScanResultWebCam(null);
    console.log("handle modal called...");
  };

  const processBeforePayement = (result) => {
    props.setSubmitting(true);
    checkCodePayement_Vendor(
      { code: result, vendorId: props.userId },
      showAlert,
      props.access
    ).then((res) => {
      if (res) {
        const keys = Object.keys({ ...res });
        if (keys.includes("msg")) {
          showAlert(
            "warning",
            res.msg,
            <FontAwesomeIcon icon={["far", "question-circle"]} />
          );
        } else {
          //handleModal();
          props.handleItem(res);
          props.showDivInfo();
        }
      }
      props.setSubmitting(false);
    });
  };

  return (
    <>
      <div className="d-flex align-items-center pt-4">
        <div className="mr-auto">
          {props.isSubmitting || props.transactionsLoading ? (
            <SyncLoader color={"var(--primary)"} loading={true} />
          ) : (
            <Button
              color="primary"
              type="submit"
              disabled={props.isSubmitting || props.transactionsLoading}
            >
              Payer
            </Button>
          )}
        </div>
        <div className="ml-auto">
          {props.isSubmitting || props.transactionsLoading ? (
            <SyncLoader color={"var(--info)"} loading={true} />
          ) : (
            <Button
              color="info"
              className="ml-0"
              onClick={handleModal}
              disabled={props.isSubmitting || props.transactionsLoading}
            >
              Scan QrCode
            </Button>
          )}
        </div>
      </div>
      {/* import qr code*/}
      <div className="d-none ">
        <div className="p-1 d-flex justify-content-center">
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: "25%" }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
          />
        </div>
        <h6 className="text-center">Code: {scanResultFile}</h6>
      </div>
      {/* scan qr code*/}
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={modalQrCode}
        toggle={handleModal}
        contentClassName="border-0"
      >
        <h6 className="text-center py-3 font-weight-bold">
          Veuillez scanner un QrCode :
        </h6>
        <div className="px-1 pb-3 d-flex justify-content-center">
          <QrReader
            delay={300}
            style={{ width: "90%" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
        </div>
        {scanResultWebCam && (
          <h6 className="text-center pb-2">Code: {scanResultWebCam}</h6>
        )}
      </Modal>
    </>
  );
};

const MyForm = (props) => {
  const { touched, errors, handleSubmit, isSubmitting, setSubmitting } = props;
  return (
    <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
      {props.modalPayementinfo === false && (
        <>
          <Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              <Label for="code">
                Entrez un code de paiement ou un numéro de facture
              </Label>
              <Field name="code" type="text" />

              {errors.code && touched.code && (
                <div style={{ color: "red", marginTop: ".5rem" }}>
                  {errors.code}
                </div>
              )}
            </Col>
          </Row>

          {/*<Row>
            <Col xl="12" style={{ margin: "12px 0" }}>
              
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
            </Col>
              </Row>*/}
          <ModalScanQrCode
            isSubmitting={isSubmitting}
            userId={props.user.id}
            handleItem={props.handleItem}
            showDivInfo={props.showDivInfo}
            transactionsLoading={props.transactions.loading}
            setSubmitting={setSubmitting}
            access={props.access}
          />
        </>
      )}
    </Form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormVendorPay = (props) => {
  const [modalPayementinfo, setModalPayementinfo] = useState(false);
  const showDivInfo = () => setModalPayementinfo(!modalPayementinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const handleSubmit = () => {
    let payload = {};

    payload["vendor"] = props.user.id;
    payload["pre_transaction"] = item.id;

    //console.log(payload);
    props.addPayement_Vendor(payload, showAlert);
    showDivInfo();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        showDivInfo={showDivInfo}
        modalPayementinfo={modalPayementinfo}
        handleItem={handleItem}
        {...props}
      />
      {modalPayementinfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    <span>Voulez-vous payer le montant de</span>
                    <Badge className="px-2 mx-1  font-size-lg" color="primary">
                      {item.montant + " MRU"}
                    </Badge>
                    <span>au commercant ci- dessous ?</span>
                  </h1>
                </div>
                <div className="px-sm-4 px-2 py-2">
                  <div className=" rounded  ">
                    <div className="px-sm-4 px-1 py-0">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Nom</div>
                            <div className=" font-size-lg text-primary">
                              {`${item.expediteur.first_name} ${item.expediteur.last_name}`}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Telephone</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.tel}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Email</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.email
                                ? item.expediteur.email
                                : " --- "}
                            </div>
                          </div>
                          <div className="divider my-2"></div>
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                            <div className=" font-size-md">Adresse</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.adresse
                                ? item.expediteur.adresse
                                : " --- "}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
                <div className="d-flex px-sm-4 px-1">
                  <div className="mr-auto">
                    <Button
                      className="btn btn-danger btn-block mb-4 px-2 px-sm-4"
                      onClick={showDivInfo}
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <Button
                      className="btn btn-success btn-block mb-4 px-2 px-sm-4"
                      onClick={handleSubmit}
                    >
                      Confirmer
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  access: state.auth.access,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { addPayement_Vendor })(FormVendorPay);
