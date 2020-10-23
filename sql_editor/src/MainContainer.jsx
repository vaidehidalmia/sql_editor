import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";

import { mockChips } from "./data/mockData";
// import ChipsBox from "./ChipsBox";
import FilterRow from "./FilterRow";

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
  const [query, setQuery] = useState({
    filters: mockChips,
    groupby: mockChips,
    aggregateBy: mockChips,
  });

  const handleChipsAdd = async (value, listName) => {
    const newList = [...query[listName], value];
    setQuery({ ...query, [listName]: newList });
  };

  const handleChipsDelete = (value, listName) => {
    const newList = query[listName].filter((item) => item !== value);
    setQuery({ ...query, [listName]: newList });
  };

  const handleChipsDeleteAll = (listName) => {
    setQuery({ ...query, [listName]: [] });
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
        <Grid item sm={12} md={4}>
          <Paper className={classes.paper}>
            <FilterRow
              chipList={query.filters}
              handleDelete={handleChipsDelete}
              handleDeleteAll={handleChipsDeleteAll}
              handleAdd={handleChipsAdd}
            />
          </Paper>
        </Grid>
        <Grid item sm={12} md={8}>
          <Paper className={classes.paper}>xs=12 sm=8</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
