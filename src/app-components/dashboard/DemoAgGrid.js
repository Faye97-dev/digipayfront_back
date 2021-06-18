import React, { Component } from "react";
import { connect } from "react-redux";

import { AgGridReact } from "ag-grid-react";
//import { AllModules } from "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getTransactions } from "../../actions/transaction";
import { showAlert } from "../../utils/alerts";
import { Button, Badge } from "reactstrap";
//import {actions} from './actions/fileActions.jsx'
//import {bindActionCreators} from 'redux';
import AG_GRID_LOCALE_ZZZ from "./locale.fr";
import {
  mapTypeNames,
  mapColorTypes,
  mapStatusNames,
  mapColorStatus,
  CAGNOTE_ANNULE,
  CAGNOTE,
  RECOLTE,
  PAIEMENT_MASSE,
} from "../../utils/choices";
import { customSwitch } from "./TransactionsClient";

const typeTransaction = (params) => {
  return mapTypeNames[params.data.type_transaction];
};

const StatusTransaction = (params) => {
  return mapStatusNames[params.data.transaction.status];
};

const mapNamesToColors = (names, colors) => {
  let res = {};
  const keys = Object.keys(names);
  for (let i = 0; i < keys.length; i++) {
    res[names[keys[i]]] = colors[keys[i]];
  }
  return res;
};

/* */

function lookupValue(mappings, key) {
  return mappings[key];
}
function removeSpaces(str) {
  return str ? str.replace(/\s/g, "") : str;
}
/*function lookupKey(mappings, name) {
  var keys = Object.keys(mappings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (mappings[key] === name) {
      return key;
    }
  }
}*/
function colourCellRenderer(params) {
  if (params.value === "(Select All)") {
    return params.value;
  }
  return `<span class="mx-1 px-2 py-1 h-auto 
  badge badge-${removeSpaces(params.valueFormatted)}">
    ${params.value}
    </span>`;
}

class DemoAgGrid extends Component {
  colDefs = [
    {
      field: "code_transaction",
      headerName: "Code transaction",

      checkboxSelection: true,
    },
    { field: "date", filter: false },
    {
      field: "transaction",
      headerName: "Expediteur",

      filter: true,
      filterParams: { buttons: ["reset", "apply"], debounceMs: 200 },
      valueGetter: (params) => {
        const keys = Object.keys({ ...params.data.transaction });
        return customSwitch(
          [
            {
              cases: [CAGNOTE],
              fn: () =>
                `${params.data.transaction.expediteur.first_name} ${params.data.transaction.expediteur.last_name}`,
            },

            {
              cases: [RECOLTE, CAGNOTE_ANNULE],
              fn: () => `${params.data.transaction.expediteur.nom}`,
            },
          ],
          params.data.type_transaction,
          () => {
            if (!keys.includes("agence_origine")) {
              return `${params.data.transaction.expediteur.first_name} ${params.data.transaction.expediteur.last_name}`;
            }
            if (
              keys.includes("agence_origine") &&
              params.data.transaction.expediteur
            ) {
              return params.data.transaction.expediteur.nom;
            }
            if (
              keys.includes("agence_origine") &&
              !params.data.transaction.expediteur
            ) {
              return params.data.transaction.agence_origine.nom;
            }
          }
        );
      },
      /*valueFormatter: function (params) {
        console.log(params.value);
        return params.value;
      },*/
      //cellRenderer: colourCellRenderer,
    },
    {
      field: "transaction",
      headerName: "Destinataire",

      filter: true,
      filterParams: { buttons: ["reset", "apply"], debounceMs: 200 },
      valueGetter: (params) => {
        const keys = Object.keys({ ...params.data.transaction });
        return customSwitch(
          [
            {
              cases: [CAGNOTE],
              fn: () => `${params.data.transaction.destinataire.nom}`,
            },

            {
              cases: [RECOLTE, CAGNOTE_ANNULE],
              fn: () =>
                `${params.data.transaction.destinataire.first_name} ${params.data.transaction.destinataire.last_name}`,
            },
          ],
          params.data.type_transaction,
          () => {
            if (
              params.data.type_transaction === PAIEMENT_MASSE &&
              this.props.user.id === params.data.transaction?.expediteur.id
            ) {
              return "-------";
            }

            if (
              params.data.type_transaction !== PAIEMENT_MASSE &&
              !keys.includes("agence_origine")
            ) {
              return `${params.data.transaction.destinataire.first_name} ${params.data.transaction.destinataire.last_name}`;
            }

            if (keys.includes("agence_origine")) {
              return params.data.transaction.destinataire.nom;
            }
          }
        );
      },
    },
    {
      field: "transaction",
      headerName: "Montant(MRU)",

      filter: true,
      filterParams: { buttons: ["reset", "apply"], debounceMs: 200 },
      valueGetter: (params) => {
        const keys = Object.keys({ ...params.data.transaction });
        return customSwitch([], params.data.type_transaction, () => {
          if (
            params.data.type_transaction === PAIEMENT_MASSE &&
            this.props.user.id === params.data.transaction?.expediteur.id
          ) {
            return params.data.transaction.total;
          } else {
            return params.data.transaction.montant;
          }
        });
      },
    },
    {
      field: "type_transaction",
      headerName: "Type",

      filter: true,
      filterParams: { buttons: ["reset", "apply"], debounceMs: 200 },
      valueGetter: typeTransaction,
      valueFormatter: function (params) {
        return lookupValue(
          mapNamesToColors(mapTypeNames, mapColorTypes),
          params.value
        );
      },
      cellRenderer: colourCellRenderer,
    },

    {
      field: "transaction.status",
      headerName: "Status",

      filter: true,
      filterParams: { buttons: ["reset", "apply"], debounceMs: 200 },
      valueGetter: StatusTransaction,
      valueFormatter: function (params) {
        return lookupValue(
          mapNamesToColors(mapStatusNames, mapColorStatus),
          params.value
        );
      },
      cellRenderer: colourCellRenderer,
      /*valueParser: function (params) {
        return lookupKey(mapColorStatus, params.newValue);
      },*/
    },
    //{ field: "categorie_transaction",  filter: true },
  ];

  gridRef = React.createRef();

  /*autoGroupColumnDef = {
    headerName: "code_transaction",
    sort: "asc",
    cellRendererParams: {
      suppressCount: true,
    },
  };*/

  //modules = AllModules;

  componentDidMount() {
    this.props.getTransactions(true, showAlert);
  }

  onButtonClick = (e) => {
    const selectedNodes = this.gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map(
        (node) =>
          `${node.code_transaction} ${node.type_transaction} ${node.transaction.status}`
      )
      .join(", ");
    alert(`${selectedDataStringPresentation}`);
  };

  render() {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      //pinned: "left",
    };
    return (
      <>
        {this.props.transactions.loading ? (
          "loading .... "
        ) : (
          <div
            style={{ flex: 1, height: 535 }}
            className="ag-theme-alpine mt-3 mb-5"
          >
            <Button
              color="primary"
              className="mb-3"
              onClick={this.onButtonClick}
            >
              Actions
            </Button>
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={this.colDefs}
              rowData={this.props.transactions.payload}
              localeText={AG_GRID_LOCALE_ZZZ}
              ref={this.gridRef}
              pagination={true}
              paginationPageSize={10}
              getRowNodeId={(data) => data.id}
              onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
              animateRows={true}

              //immutableData={true}
              //rowSelection="multiple"
              //autoGroupColumnDef={this.autoGroupColumnDef}
              //modules={this.modules}
              //groupDefaultExpanded={-1}
              //getContextMenuItems={this.getContextMenuItems}
            ></AgGridReact>
          </div>
        )}
      </>
    );
  }

  getContextMenuItems = (params) => {
    const folderActions = [
      {
        name: "New File",
        action: () => console.log("new file"), //this.props.actions.newFile(params.node.key)
      },
    ];

    const fileActions = [
      {
        name: "Delete File",
        action: () => console.log("delete file"), //this.props.actions.deleteFile(params.node.data.id)
      },
    ];

    return params.node.group ? folderActions : fileActions;
  };
}

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
  user: state.auth.user,
  access: state.auth.access,
});

export default connect(mapStateToProps, {
  getTransactions,
})(DemoAgGrid);
