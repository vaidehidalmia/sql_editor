import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { savedQueries, tableMetaData } from "./data/mockData";
import ClickableCards from "./ClickableCards";
import TableBar from "./TableBar";
import TableExample from "./TableExample";

import './main.css';
import { Button } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import QueryTabs from "./QueryTabs";

import customers from "./data/customer_edited.json";
import products from "./data/products.json";


const MainContainer = () => {
  const defaultQueryState = {
    filterBy: [],
    groupBy: [],
    aggregateBy: [],
    hideColumns: [],
  };
  const [query, setQuery] = useState(defaultQueryState);
  const [submitQuery, setSubmitQuery] = useState(defaultQueryState);
  const [tableId, setTableId] = useState("customers");
  const [tableData, setTableData] = useState(customers);

  const handleShowHideColumnsChange = (newList, listName="hideColumns") => {
    setQuery({ ...query, [listName]: newList });
  }
  
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

  const handleOtherTablesItemClick = (e) => {
    const item = e.target.innerText;
    setTableId(item);
    setQuery(defaultQueryState);
    switch(item) {
      case "customers":
        setTableData(customers);
        break;
      case "products":
        console.log('here');
        setTableData(products);
        break;
      default:
        setTableData(customers);
    }
  }

  const handleRunQuery = () => {
    setSubmitQuery(query);
  }

  return (
    <div className="flex-grow">
      <Grid container>
        {/* <Grid item xs={12}>
          <h1>SQL Editor</h1>
        </Grid> */}
        <Grid item sm={12} md={4}>
          <Paper className="paper">
            <QueryTabs
              tableId={tableId} 
              query={query}
              handleShowHideColumnsChange={handleShowHideColumnsChange}
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
                onClick={handleRunQuery}
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
              {
                savedQueries[tableId].length > 0 ?
                  <ClickableCards
                    cardList={savedQueries[tableId]}
                    clickDataKey="query"
                    handleClick={handleSavedQueriesClick}
                  /> :
                  <div className="fontsize07 margin2">No queries saved for this table</div>
              }
            </div>
          </Paper>
        </Grid>
        <Grid item sm={12} md={8}>
          {/* <Header /> */}
          <div className="header" id="main-header">
            <h1 className="margin2">SQL Editor</h1>
            <div className="flex-grow"></div>
            <div className="textalign-right">
              <h3 className="margin2">{tableMetaData[tableId]["title"]}</h3>
              <div className="fontsize07"><span className="bold">{tableMetaData[tableId]["rows"]}</span> rows <span className="bold">{tableMetaData[tableId]["columns"]}</span> columns</div>
            </div>
          </div>
          <TableBar tableId={tableId} handleOtherTablesItemClick={handleOtherTablesItemClick}/>
          <TableExample tableData={tableData} tableQuery={submitQuery} />
          {/* <Paper className={classes.paper}>xs=12 sm=8</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
