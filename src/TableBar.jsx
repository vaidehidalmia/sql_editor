import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { tableMetaData } from "./data/mockData";
import SimpleMenu from "./SimpleMenu";
import SaveTableButton from "./SaveTableButton";
import DownloadAsButton from "./DownloadAsButton";
import AddToReportButton from "./AddToReportButton";
import JoinTableButton from "./JoinTableButton";

import './main.css';

const TableBar = (props) => {

  return (
    <div className="flex-grow">
      <AppBar position="static" id="table-bar">
        <Toolbar>
          <SaveTableButton />
          <DownloadAsButton />
          <AddToReportButton />
          <div className="flex-grow" />
          <JoinTableButton currentTable={props.tableId} />
          <SimpleMenu list={Object.keys(tableMetaData)} label="Other Tables" handleItemClick={props.handleOtherTablesItemClick}/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TableBar;
