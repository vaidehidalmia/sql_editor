import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { otherTables, downloadAs, reports } from "./data/mockData";
import SimpleMenu from "./SimpleMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightOfBar: {
    flexGrow: 1,
    // textAlign: "right",
  },
}));

const TableBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Save</Button>
          <SimpleMenu list={downloadAs} label="Download As" />
          <SimpleMenu list={reports} label="Add to Report" />
          <div className={classes.rightOfBar} />
          <SimpleMenu list={otherTables} label="Join Table" />
          <SimpleMenu list={otherTables} label="Other Tables" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TableBar;
