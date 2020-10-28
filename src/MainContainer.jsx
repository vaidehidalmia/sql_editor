import React, { useState } from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';

import ClickableCards from "./genericComponents/ClickableCards";
import QueryTabs from "./queryComponents/QueryTabs";
import TableBar from "./tableComponents/tableMenu/TableBar";
import TableExample from "./tableComponents/TableExample";
import SaveQueryButton from "./queryComponents/SaveQueryButton";

import { savedQueries, tableMetaData } from "./data/mockData";
import customers from "./data/customer_edited.json";
import products from "./data/products.json";
import categories from "./data/categories.json";

import './main.css';



const MainContainer = () => {
  const defaultQueryState = {
    filterBy: [],
    groupBy: [],
    aggregateBy: [],
    hideColumns: [],
  };
  const [query, setQuery] = useState(defaultQueryState);
  // submit query is set when user clicks run query button
  const [submitQuery, setSubmitQuery] = useState(defaultQueryState);
  const [tableId, setTableId] = useState("products");
  const [tableData, setTableData] = useState(products);

  // handles user filter for columns to show
  const handleShowHideColumnsChange = (newList, listName="hideColumns") => {
    setQuery({ ...query, [listName]: newList });
  }
  
  // appends [value] to [listName] array in query 
  // used to handle addition of chips
  const handleChipsAdd = async (value, listName) => {
    const newList = [...query[listName], value];
    setQuery({ ...query, [listName]: newList });
  };

  // deletes [value] from [listName] array in query
  // used to handle deletion of chip
  const handleChipsDelete = (value, listName) => {
    const newList = query[listName].filter((item) => item !== value);
    setQuery({ ...query, [listName]: newList });
  };

  // resets [listName] array to empty array in query
  // used to handle clear all chips
  const handleChipsDeleteAll = (listName) => {
    setQuery({ ...query, [listName]: [] });
  };

  // handles user clicking on a saved query card
  const handleSavedQueriesClick = (selectedQuery) => {
    setQuery(selectedQuery);
  };

  // handles change in table 
  const handleOtherTablesItemClick = (e) => {
    const item = e.target.innerText;
    setTableId(item);
    setQuery(defaultQueryState);
    switch(item) {
      case "customers":
        setTableData(customers);
        break;
      case "products":
        setTableData(products);
        break;
      case "categories":
        setTableData(categories);
        break;
      default:
        setTableData(products);
    }
  }

  // handles run query
  const handleRunQuery = () => {
    setSubmitQuery(query);
  }

  return (
    <div className="flex-grow">
      <Grid container>
        <Grid item sm={12} md={4}>
          <Paper className="paper">
            {/* tabs to switch  between easy filter and custom sql*/}
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
              {/* Run Query Button */}
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
              <SaveQueryButton />
            </Grid>
            <br></br>
            {/* cards showcasing saved queries */}
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
          <div className="header" id="main-header">
            <h1 className="margin2">SQL Editor</h1>
            <div className="flex-grow"></div>
            {/* table header data */}
            <div className="textalign-right">
              <h3 className="margin2">{tableMetaData[tableId]["title"]}</h3>
              <div className="fontsize07"><span className="bold">{tableMetaData[tableId]["rows"]}</span> rows <span className="bold">{tableMetaData[tableId]["columns"]}</span> columns</div>
            </div>
          </div>
          {/* table menu */}
          <TableBar tableId={tableId} handleOtherTablesItemClick={handleOtherTablesItemClick}/>
          {/* table data */}
          <TableExample tableData={tableData} tableQuery={submitQuery} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
