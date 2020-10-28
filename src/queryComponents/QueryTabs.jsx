import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, TextareaAutosize } from '@material-ui/core';

import FilterBy from "./FilterBy";
import GroupBy from "./GroupBy";
import AggregateBy from "./AggregateBy";
import ShowHideColumns from './ShowHideColumns';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} id={`panel-${index}`}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const QueryTabs = (props) => {
  const { 
    tableId, 
    handleChipsAdd, 
    handleChipsDelete, 
    handleChipsDeleteAll, 
    handleShowHideColumnsChange, 
    query
  } = props;
  
  const [value, setValue] = useState(0);

  // handle change in tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex-grow">
      <AppBar position="static" id="query-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Easy Filter" {...a11yProps(0)} />
          <Tab label="Custom SQL" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* Tab panel for easy filter */}
      <TabPanel value={value} index={0}>
        {/* <ShowHideColumns 
          tableId={tableId} 
          handleShowHideColumnsChange={handleShowHideColumnsChange}
        /> */}
        <FilterBy
          tableId={tableId}
          chipList={query.filterBy}
          handleDelete={handleChipsDelete}
          handleDeleteAll={handleChipsDeleteAll}
          handleAdd={handleChipsAdd}
        />
        <GroupBy
          tableId={tableId}
          chipList={query.groupBy}
          handleDelete={handleChipsDelete}
          handleDeleteAll={handleChipsDeleteAll}
          handleAdd={handleChipsAdd}
        />
        <AggregateBy
          tableId={tableId}
          chipList={query.aggregateBy}
          handleDelete={handleChipsDelete}
          handleDeleteAll={handleChipsDeleteAll}
          handleAdd={handleChipsAdd}
        />
      </TabPanel>
      {/* Tab panel for custom SQL */}
      <TabPanel value={value} index={1}>
        <TextareaAutosize className="width-fillavailable" aria-label="sql-query" rowsMin={10} rowsMax={50} placeholder="Write your SQL query here." />
      </TabPanel>
    </div>
  );
}

export default QueryTabs;