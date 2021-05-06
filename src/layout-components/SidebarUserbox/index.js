import React, { useState } from "react";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Modal } from "reactstrap";

import av1 from "../../assets/images/avatars/av1.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { VENDOR } from "../../utils/choices";
const SidebarUserbox = (props) => {
  const [modalQrCode, setModalQrCode] = useState(false);
  const handleModal = (text = null) => {
    generateQrCode(text).then((res) => {
      setModalQrCode(!modalQrCode);
    });
  };
  const [imageUrl, setImageUrl] = useState("");

  const generateQrCode = async (text) => {
    var opts = {
      //errorCorrectionLevel: 'H',
      type: "image/jpeg",
      quality: 1,
      margin: 0.5,
      color: {
        dark: "#3c44b1",
        //light: "#FFBF60FF",
      },
    };
    let result = null;
    if (typeof text === "string") {
      try {
        const response = await QRCode.toDataURL(text, opts);
        setImageUrl(response);
        result = response;
      } catch (error) {
        console.log(error);
        result = null;
      }
    }
    return result;
  };
  const profil = (
    <div className="app-sidebar--userbox">
      <div className="avatar-icon-wrapper avatar-icon-md">
        <Badge color="success" className="badge-circle">
          Online
        </Badge>
        <div className="avatar-icon rounded-circle">
          <img alt="..." src={av1} />
        </div>
      </div>
      <div className="mt-3 mb-0 userbox-details">
        {props.user && props.user.first_name + " " + props.user.last_name}
        <span className="d-block text-white py-1">
          <Badge color="primary">{props.role && props.role.label}</Badge>
          {props.user?.premium && (
            <Badge color="info" className="mx-1">
              Pro
            </Badge>
          )}
        </span>
        <small className="d-block text-white-20">
          {props.user && props.user.tel}
        </small>
      </div>
      {props.role?.value === VENDOR && (
        <Button
          className="m-1 p-1"
          size="sm"
          color="first"
          onClick={() => handleModal(props.user?.myId)}
        >
          QrCode
        </Button>
      )}
    </div>
  );
  return (
    <>
      {profil}
      <Modal
        zIndex={2000}
        centered
        size="sm"
        isOpen={modalQrCode}
        toggle={handleModal}
        contentClassName="border-0"
      >
        <div className="p-2">
          {imageUrl && (
            /*<a href={imageUrl} download={`QrCode${Date.now()}`}>*/
            <>
              <a href={imageUrl} download={`QrCode${Date.now()}`}>
                <img src={imageUrl} alt="img" width="100%" />
              </a>
              <p className="text-black p-1 m-0 text-center font-size-xl font-weight-normal">
                Code commerçant :
                <Badge color="primary" className=" mx-2 px-2 ">
                  <span className="text-white font-size-xl ">
                    {props.user?.myId}
                  </span>
                </Badge>
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  role: state.auth.role,
});

export default connect(mapStateToProps, {})(SidebarUserbox);
