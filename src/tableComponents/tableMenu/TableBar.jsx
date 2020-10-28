import React from "react";
import {AppBar, Toolbar} from "@material-ui/core";

import SimpleMenu from "../../genericComponents/SimpleMenu";
import SaveTableButton from "./SaveTableButton";
import DownloadAsButton from "./DownloadAsButton";
import AddToReportButton from "./AddToReportButton";
import JoinTableButton from "./JoinTableButton";

import { otherTables } from "../../data/mockData";


const TableBar = (props) => {
  const { tableId, handleOtherTablesItemClick } = props;

  return (
    <div className="flex-grow">
      <AppBar position="static" id="table-bar">
        <Toolbar>
          <SaveTableButton />
          <DownloadAsButton />
          <AddToReportButton />
          <div className="flex-grow" />
          <JoinTableButton currentTable={tableId} />
          <SimpleMenu list={otherTables.filter(e => e !== tableId)} label="Other Tables" handleItemClick={handleOtherTablesItemClick}/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TableBar;
