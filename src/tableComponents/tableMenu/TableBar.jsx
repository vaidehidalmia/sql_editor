import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";

import SimpleMenu from "../../genericComponents/SimpleMenu";
import SaveTableButton from "./SaveTableButton";
import DownloadAsButton from "./DownloadAsButton";
import AddToReportButton from "./AddToReportButton";
import JoinTableButton from "./JoinTableButton";

import { tableMetaData } from "../../data/mockData";


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
