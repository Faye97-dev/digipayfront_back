import React, { Component } from "react";
import AgenceList from "./AgenceList";
import AgenceStatusList from "./AgenceStatusList";
import { AGENT_COMPENSATION } from "../../utils/choices";
import { connect } from "react-redux";
export class Agence extends Component {
  render() {
    return (
      <>
        {this.props.role && (
          <>
            {this.props.role.value === AGENT_COMPENSATION ? (
              <AgenceStatusList></AgenceStatusList>
            ) : (
              <AgenceList></AgenceList>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, {})(Agence);
