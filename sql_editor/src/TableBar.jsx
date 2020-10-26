import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { otherTables, downloadAs, reports } from "./data/mockData";
import SimpleMenu from "./SimpleMenu";
import SaveTableButton from "./SaveTableButton";
import DownloadAsButton from "./DownloadAsButton";
import AddToReportButton from "./AddToReportButton";
import JoinTableButton from "./JoinTableButton";

import './main.css';

const useStyles = makeStyles((theme) => ({
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
}));

const TableBar = () => {
  const classes = useStyles();

  return (
    <div className="flex-grow">
      <AppBar position="static" id="table-bar">
        <Toolbar>
          <SaveTableButton />
          <DownloadAsButton />
          <AddToReportButton />
          <div className="flex-grow" />
          <JoinTableButton currentTable="Customers" />
          <SimpleMenu list={otherTables} label="Other Tables" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TableBar;
