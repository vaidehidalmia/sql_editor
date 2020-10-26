import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";

import { mockChips, savedQueries } from "./data/mockData";
import FilterBy from "./FilterBy";
import GroupBy from "./GroupBy";
import AggregateBy from "./AggregateBy";
import ClickableCards from "./ClickableCards";
import TableBar from "./TableBar";
import TableExample from "./TableExample";

import './main.css';
import { Button } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';

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
    filterBy: mockChips,
    groupBy: mockChips,
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

  const handleSavedQueriesClick = (selectedQuery) => {
    console.log("Click ", selectedQuery);
    setQuery(selectedQuery);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h1>SQL Editor</h1>
        </Grid>
        {/* <Grid item xs={12}>
          <Header />
        </Grid> */}
        <Grid item sm={12} md={4}>
          <Paper className={classes.paper}>
            <FilterBy
              chipList={query.filterBy}
              handleDelete={handleChipsDelete}
              handleDeleteAll={handleChipsDeleteAll}
              handleAdd={handleChipsAdd}
            />
            <GroupBy
              chipList={query.groupBy}
              handleDelete={handleChipsDelete}
              handleDeleteAll={handleChipsDeleteAll}
              handleAdd={handleChipsAdd}
            />
            <AggregateBy
              chipList={query.aggregateBy}
              handleDelete={handleChipsDelete}
              handleDeleteAll={handleChipsDeleteAll}
              handleAdd={handleChipsAdd}
            />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                id="run-query-button"
                className="text-transform-initial"
                variant="contained"
                color="primary"
                disableElevation
                size="small"
                endIcon={<PlayArrowIcon />}
              >
                Run Query
              </Button>
              <Button
                id="save-query-button"
                className="text-transform-initial"
                variant="contained"
                color="primary"
                disableElevation
                size="small"
                endIcon={<SaveIcon />}
              >
                Save Query
              </Button>
            </Grid>
            <br></br>
            <div className="header">Saved Queries</div>
            <div>
              <ClickableCards
                cardList={savedQueries}
                clickDataKey="query"
                handleClick={handleSavedQueriesClick}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item sm={12} md={8}>
          {/* <Header /> */}
          <h2>Customers</h2>
          <TableBar />
          <TableExample />
          {/* <Paper className={classes.paper}>xs=12 sm=8</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
