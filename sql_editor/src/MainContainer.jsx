import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";

import { mockChips } from "./data/mockData";
import ChipsBox from "./ChipsBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const MainContainer = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState(mockChips);

  const handleChipsDelete = (value) => {
    const newList = filters.filter((item) => item !== value);
    setFilters(newList);
  };

  const handleChipsDeleteAll = (value) => {
    setFilters([]);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h1>SQL Editor</h1>
        </Grid>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <ChipsBox
              chipList={filters}
              handleDelete={handleChipsDelete}
              handleDeleteAll={handleChipsDeleteAll}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>xs=12 sm=8</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
