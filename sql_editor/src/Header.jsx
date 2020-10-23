import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { otherTables, exportAs } from "./data/mockData";
import SimpleMenu from "./SimpleMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
  },
}));

const Header = () => {
  const [tableName, setTableName] = useState();
  const classes = useStyles();

  const onOtherTablesSelect = (name) => {
    setTableName(name);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu
            list={otherTables}
            label="Other Tables"
            onMenuItemClick={onOtherTablesSelect}
          />
          <SimpleMenu list={exportAs} label="Export As" />
          <Typography variant="h5" className={classes.title}>
            {tableName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
