import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  Container,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Table,
} from "reactstrap";
import { FlagIcon } from "react-flag-kit";
import Switch from "rc-switch";
export default function ProfilSettings() {
  const [checked1, setChecked1] = useState(false);

  const toggleCheck1 = () => {
    setChecked1(!checked1);
  };

  const [checked2, setChecked2] = useState(false);

  const toggleCheck2 = () => {
    setChecked2(!checked2);
  };
  return (
    <Card className="bg-white p-3">
      <span className="ribbon-angle ribbon-angle--top-right ribbon-warning">
        <small>Demo</small>
      </span>
      <Container className="py-3">
        <div>
          <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-4">
            <div>
              <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                Compte
              </h6>
              <p className="text-black-50 mb-0">
                Gérez les paramètres de votre compte dans la section ci-dessous.
              </p>
            </div>
          </CardHeader>
        </div>
        <ListGroup className="mb-4">
          <ListGroupItem>
            <div className="font-weight-bold">Choix de la langue</div>
            <div className="pt-3" role="group" aria-labelledby="my-radio-group">
              <label>
                <input type="radio" name="card_type" value="fr" />
                Français
                <span className="px-2">
                  <FlagIcon code="FR" size={35} />
                </span>
              </label>
              <label className="pl-sm-3 px-0">
                <input type="radio" name="card_type" value="ar" />
                Arabe
                <span className="px-2">
                  <FlagIcon code="MR" size={35} />
                </span>
              </label>
              <label className="pl-sm-3 px-0">
                <input type="radio" name="card_type" value="ch" />
                Chinois
                <span className="px-2">
                  <FlagIcon code="CN" size={35} />
                </span>
              </label>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center mr-4">
              <div>
                <div className="font-weight-bold">Activer les sms</div>
                <span className="opacity-6 d-block">
                  Vous permet de recevoir des notifications par sms
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Switch
                checked={checked1}
                onClick={toggleCheck1}
                className="switch-medium"
              />
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center mr-4">
              <div>
                <div className="font-weight-bold">
                  Activer la connexion avec code PIN
                </div>
                <span className="opacity-6 d-block">
                  Pour plus de sécurité ajouter cette étape de validation
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Switch
                checked={checked2}
                onClick={toggleCheck2}
                className="switch-medium"
              />
            </div>
          </ListGroupItem>
        </ListGroup>
        <ListGroup>
          <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center mr-0 mr-md-4">
              <div>
                <div className="font-weight-bold">Changement Password</div>
                <span className="opacity-6 d-block">
                  Choisissez un nouveau mot de passe
                </span>
              </div>
            </div>
            <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
              <Button size="sm" color="warning" className="text-nowrap">
                Modifier
              </Button>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-block d-lg-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center mr-0 mr-md-4">
              <div>
                <div className="font-weight-bold d-flex align-items-center">
                  Authentification à deux facteurs
                  <Badge color="success" className="text-uppercase ml-2">
                    Activé
                  </Badge>
                </div>
                <span className="opacity-6 d-block">
                  Activer l'usage du code pour pouvoir utiliser cette
                  fonctionnalité
                </span>
              </div>
            </div>
            <div className="d-block d-md-flex mt-3 mt-lg-0 align-items-center">
              <Button size="sm" active color="primary">
                Desactivé
              </Button>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Container>
      <div className="divider my-4" />
      <Container>
        <div>
          <CardHeader className="d-flex align-items-center bg-transparent card-header-alt px-0 pb-4">
            <div>
              <h6 className="font-weight-bold font-size-xl mb-1 text-black">
                Vos logs :
              </h6>
              <p className="text-black-50 mb-0">Vos dernières connexions</p>
            </div>
          </CardHeader>
          <Table bordered responsive size="sm" className="text-nowrap mb-4">
            <thead className="thead-light text-capitalize font-size-sm font-weight-bold">
              <tr>
                <th className="text-left px-4">Navigateur</th>
                <th className="text-left px-4">Adresse IP</th>
                <th className="text-left px-4">Localisation</th>
                <th className="text-left px-4">Date</th>
                <th className="text-center" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4">Chrome dans windows 8</td>
                <td className="text-left px-4">192.168.0.1</td>
                <td className="text-left px-4">Tvz, Nouakchott</td>
                <td className="text-left px-4">19 Fev, 2021 | 11:22</td>
                <td className="text-center">
                  <Button
                    color="neutral-danger"
                    className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["fas", "times"]}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-4">Chrome dans Samsung A20s</td>
                <td className="text-left px-4">194.167.25.1</td>
                <td className="text-left px-4">Ksar, Nouackchott</td>
                <td className="text-left px-4">30 Jan, 2021 | 07:35</td>
                <td className="text-center">
                  <Button
                    color="neutral-danger"
                    className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["fas", "times"]}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-4">Firefox dans Macbook Pro 2015</td>
                <td className="text-left px-4">245.120.058.1</td>
                <td className="text-left px-4">Tvz, Nouackchott</td>
                <td className="text-left px-4">15 Jan, 2021 | 14:49</td>
                <td className="text-center">
                  <Button
                    color="neutral-danger"
                    className="mx-1 shadow-none d-30 border-0 p-0 d-inline-flex align-items-center justify-content-center"
                  >
                    <FontAwesomeIcon
                      icon={["fas", "times"]}
                      className="font-size-sm"
                    />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </Card>
  );
}
