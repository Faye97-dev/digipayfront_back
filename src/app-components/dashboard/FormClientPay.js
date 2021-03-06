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
import { checkCodePayement, client_check_VendorId } from "../../actions/async";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { addPayement_clientDigipay } from "../../actions/transaction";
import QrReader from "react-qr-reader";
import FormClientFastPay from "./FormClientFastPay";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    code: Yup.string().required(
      "Code de paiement ou numéro de commerçant est obligatoire !"
    ),
  }),
  mapPropsToValues: (props) => ({
    code: "",
  }),
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    if (payload.code !== "" && payload.code[0] === "0") {
      client_check_VendorId(payload, showAlert, props.access).then((res) => {
        if (res) {
          const keys = Object.keys({ ...res });
          if (keys.includes("msg")) {
            showAlert(
              "warning",
              res.msg,
              <FontAwesomeIcon icon={["far", "question-circle"]} />
            );
          } else {
            props.handleModalFastPayement(res);
          }
        }
        setSubmitting(false);
        resetForm();
      });
    } else {
      checkCodePayement(payload, showAlert, props.access).then((res) => {
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
    }
  },
  displayName: "MyForm",
});

const ModalScanQrCode = (props) => {
  // Qr reader file ... not used
  const [scanResultFile, setScanResultFile] = useState(null);
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    //console.log("scaned qr code ...", result);
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
    //console.log("handle modal called...");
  };

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

  const processBeforePayement = (result) => {
    props.setSubmitting(true);
    if (result !== "" && result[0] === "0") {
      client_check_VendorId({ code: result }, showAlert, props.access).then(
        (res) => {
          if (res) {
            const keys = Object.keys({ ...res });
            if (keys.includes("msg")) {
              showAlert(
                "warning",
                res.msg,
                <FontAwesomeIcon icon={["far", "question-circle"]} />
              );
            } else {
              props.handleModalFastPayement(res);
            }
          }
          props.setSubmitting(false);
          props.resetForm();
        }
      );
    } else {
      checkCodePayement({ code: result }, showAlert, props.access).then(
        (res) => {
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
          props.setSubmitting(false);
        }
      );
    }
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
            <div>
              {/*<Button
            color="info"
            className="ml-0"
            onClick={onScanFile}
            disabled={props.isSubmitting || props.transactionsLoading}
          >
            Import QrCode
          </Button>*/}
              <Button
                color="info"
                className="ml-0"
                onClick={handleModal}
                disabled={props.isSubmitting || props.transactionsLoading}
              >
                Scan QrCode
              </Button>
            </div>
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

const ModalFastPayement = (props) => {
  const beforeSubmit = (data) => {
    let payload = { ...data };
    payload["client"] = props.user.id;
    payload["vendor"] = props.vendorInfo.id;
    return payload;
  };

  return (
    <>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={props.modalFastPay}
        toggle={props.handleModalFastPayement}
        contentClassName="border-0"
      >
        <div className="px-2 py-3">
          <Card className="mx-sm-1 mx-1 mt-0 mb-0 px-1 py-1">
            <Row className="no-gutters">
              <Col xl="12">
                <div className="bg-white rounded pt-4 pb-0">
                  <div className="px-1 px-sm-1 pt-1 pb-1">
                    <h1 className="display-4 font-weight-bold font-size-lg text-center">
                      <span>Voulez-vous payer le commerçant ci- dessous ?</span>
                    </h1>
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-wrap px-4 py-1">
                    <div className=" font-size-md">Nom</div>
                    <div className=" font-size-lg text-primary">
                      {`${props.vendorInfo?.first_name} ${props.vendorInfo?.last_name}`}
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-wrap px-4 py-1">
                    <div className=" font-size-md">Code commerçant</div>
                    <div className=" font-size-lg text-primary">{`${props.vendorInfo?.myId}`}</div>
                  </div>
                  {/*<div className="d-flex align-items-center justify-content-between flex-wrap px-4 py-1">
                    <div className=" font-size-md">Email</div>
                    <div className=" font-size-lg text-primary">
                      test@gamail.com
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-wrap px-4 py-1">
                    <div className=" font-size-md">Adresse</div>
                    <div className=" font-size-lg text-primary">------</div>
                  </div>*/}
                </div>
              </Col>
              <Col xl="12">
                <FormClientFastPay
                  beforeSubmit={beforeSubmit}
                  closeModal={props.handleModalFastPayement}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Modal>
    </>
  );
};

const MyForm = (props) => {
  const {
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    //setFieldValue,
    setSubmitting,
    resetForm,
  } = props;
  return (
    <>
      <Form onSubmit={handleSubmit} className="px-sm-5 px-1">
        {props.modalPayementinfo === false && (
          <>
            <Row>
              <Col xl="12" style={{ margin: "12px 0" }}>
                <Label for="code">
                  Entrez un numéro de commerçant ou un code de paiement
                </Label>
                <Field name="code" type="text" />

                {errors.code && touched.code && (
                  <div style={{ color: "red", marginTop: ".5rem" }}>
                    {errors.code}
                  </div>
                )}
              </Col>
            </Row>
            <ModalScanQrCode
              isSubmitting={isSubmitting}
              access={props.access}
              handleItem={props.handleItem}
              showDivInfo={props.showDivInfo}
              transactionsLoading={props.transactions.loading}
              setSubmitting={setSubmitting}
              handleModalFastPayement={props.handleModalFastPayement}
              resetForm={resetForm}
            />
            <ModalFastPayement
              modalFastPay={props.modalFastPay}
              handleModalFastPayement={props.handleModalFastPayement}
              vendorInfo={props.vendorInfo}
              user={props.user}
            />
          </>
        )}
      </Form>
    </>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const FormClientPay = (props) => {
  const [modalPayementinfo, setModalPayementinfo] = useState(false);
  const showDivInfo = () => setModalPayementinfo(!modalPayementinfo);

  const [item, setItem] = useState(null);
  const handleItem = (obj) => setItem(obj);

  const [vendorInfo, setVendorInfo] = useState(null); // for fast-payement
  const [modalFastPay, setModalFastPay] = useState(false);
  const handleModalFastPayement = (obj = null) => {
    setVendorInfo(obj);
    setModalFastPay(!modalFastPay);
  };

  const handleSubmit = () => {
    let payload = {};

    payload["client"] = props.user.id;
    payload["pre_transaction"] = item.id;
    payload["livraison"] = item.livraison;

    props.addPayement_clientDigipay(payload, showAlert);
    showDivInfo();
    // reset form ??
  };
  return (
    <>
      <MyEnhancedForm
        showDivInfo={showDivInfo}
        modalPayementinfo={modalPayementinfo}
        handleItem={handleItem}
        modalFastPay={modalFastPay}
        handleModalFastPayement={handleModalFastPayement}
        vendorInfo={vendorInfo}
        {...props}
      />
      {modalPayementinfo && (
        <Card className="card-box mx-sm-5 mx-1 mt-5 mb-5 px-1 py-1">
          <Row className="no-gutters">
            <Col xl="12">
              <div className="bg-white rounded ">
                <div className="px-2 px-sm-5 pt-4 pb-2">
                  <h1 className="display-4 font-weight-normal font-size-xl text-center">
                    {!item.livraison ? (
                      <>
                        <span>Voulez-vous payer le montant de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.montant + " MRU"}
                        </Badge>
                        <span>au commerçant ci- dessous ?</span>
                      </>
                    ) : (
                      <>
                        <span>Voulez-vous payer le montant de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.montant + " MRU"}
                        </Badge>
                        <span>au commerçant ci- dessous pour un délai de</span>
                        <Badge
                          className="px-2 mx-1  font-size-lg"
                          color="primary"
                        >
                          {item.delai_livraison}
                        </Badge>
                        <span>
                          {item.delai_livraison > 1 ? "jours ?" : "jour ?"}
                        </span>
                      </>
                    )}

                    <br />
                    {item.livraison && (
                      <Badge
                        className="px-2 mx-1 my-2 font-size-sm"
                        color="success"
                      >
                        Livraison à domicile
                      </Badge>
                    )}
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
                            <div className=" font-size-md">Téléphone</div>
                            <div className=" font-size-lg text-primary">
                              {item.expediteur.tel}
                            </div>
                          </div>
                          {item?.libele && item.libele !== "" && (
                            <>
                              <div className="divider my-2"></div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap px-3 py-1">
                                <div className=" font-size-md">Libellé</div>
                                <div className=" font-size-lg text-primary">
                                  {item.libele}
                                </div>
                              </div>
                            </>
                          )}

                          {/*<div className="divider my-2"></div>
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
                          </div>*/}
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

export default connect(mapStateToProps, { addPayement_clientDigipay })(
  FormClientPay
);
