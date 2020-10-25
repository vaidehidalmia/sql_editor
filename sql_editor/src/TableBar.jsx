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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightOfBar: {
    flexGrow: 1,
  },
}));

const TableBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SaveTableButton />
          <DownloadAsButton />
          <AddToReportButton />
          <div className={classes.rightOfBar} />
          <JoinTableButton currentTable="Customers" />
          <SimpleMenu list={otherTables} label="Other Tables" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TableBar;
