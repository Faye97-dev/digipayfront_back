import React from "react";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation";
import { Button, Row, Col, Label, FormGroup } from "reactstrap";

export default class FormTransfert extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });
  }

  render() {
    const defaultValues = {
      agence_destination: "Agence 4",
    };

    return (
      <div className="px-5">
        {/*<AvForm onSubmit={this.handleSubmit} model={defaultValues}>*/}
        <AvForm onSubmit={this.handleSubmit}>
          {/* With AvField */}
          <Row>
            <Col xl="12">
              {/* With select and AvField */}
              <AvField
                type="select"
                name="agence_destination"
                label="Agence de destination"
                required
              >
                <option>Agence 1</option>
                <option>Agence 2</option>
                <option>Agence 3</option>
                <option>Agence 4</option>
              </AvField>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              {/* With select and AvField */}
              <AvField
                type="select"
                name="destinataire"
                label="Destinataire"
                required
              >
                <option>Client 1</option>
                <option>Client 2</option>
              </AvField>
            </Col>
            <Col xl="6">
              <AvGroup>
                <Label for="montant">Montant</Label>
                <AvInput name="montant" id="montant" type="number" required />
                <AvFeedback>Champ non renseigner !</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <AvGroup>
                <Label for="frais_origine">Frais d'origine</Label>
                <AvInput
                  name="frais_origine"
                  id="frais_origine"
                  type="number"
                  required
                />
                <AvFeedback>Champ non renseigner !</AvFeedback>
              </AvGroup>
            </Col>
            <Col xl="6">
              <AvGroup>
                <Label for="frais_destination">Frais de destination</Label>
                <AvInput
                  name="frais_destination"
                  id="frais_destination"
                  type="number"
                  required
                />
                <AvFeedback>Champ non renseigner !</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <AvGroup>
                <Label for="remarque">Remarque </Label>
                <AvInput name="remarque" id="remarque" />
                <AvFeedback>Champ non renseigner !</AvFeedback>
              </AvGroup>
            </Col>
            <Col xl="12">
              <AvGroup>
                <Label for="note">Note</Label>
                <AvInput name="note" id="note" />
                <AvFeedback>Champ non renseigner !</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <FormGroup>
            <Button color="primary">Submit</Button>
          </FormGroup>
        </AvForm>
        {this.state.values && (
          <div>
            <h5>Submission values</h5>
            Invalid: {this.state.errors.join(", ")}
            <br />
            Values: <pre>{JSON.stringify(this.state.values, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}
