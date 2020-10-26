import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import FilterBy from "./FilterBy";
import GroupBy from "./GroupBy";
import AggregateBy from "./AggregateBy";

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function QueryTabs(props) {
  const { handleChipsAdd, handleChipsDelete, handleChipsDeleteAll, query} = props;
  const [value, setValue] = useState(0);

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
      <TabPanel value={value} index={0}>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextareaAutosize className="width-fillavailable" aria-label="sql-query" rowsMin={10} rowsMax={50} placeholder="Write your SQL query here." />
      </TabPanel>
    </div>
  );
}