import React, { useState } from "react";
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
import QueryTabs from "./QueryTabs";


const MainContainer = () => {
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
    <div className="flex-grow">
      <Grid container>
        {/* <Grid item xs={12}>
          <h1>SQL Editor</h1>
        </Grid> */}
        <Grid item sm={12} md={4}>
          <Paper className="paper">
            <QueryTabs 
              query={query}
              handleChipsAdd={handleChipsAdd}
              handleChipsDelete={handleChipsDelete}
              handleChipsDeleteAll={handleChipsDeleteAll}/>
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
            <div className="header bold">Saved Queries</div>
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
          <div className="text-center header">
            <h2 className="margin2">Customers</h2>
            <div className="fontsize07"><span className="bold">100</span> rows <span className="bold">20</span> columns</div>
          </div>
          <TableBar />
          <TableExample />
          {/* <Paper className={classes.paper}>xs=12 sm=8</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
