import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import ChipsBox from "../genericComponents/ChipsBox";
import DropdownWithSearch from "../genericComponents/DropdownWithSearch";

import { top100Films, tableMetaData, operators } from "../data/mockData";

import './query.css';

// user can select column, operation, value to filter rows
// this is the WHERE clause in SQL
const FilterBy = (props) => {
  const { handleAdd, tableId } = props;
  const queryType = "filterBy";
  const [filter, setFilter] = useState([null, null, null]);
  const [errorText, setErrorText] = useState(null);
  
  // handles submit filter
  const addFilter = async () => {
    if (filter.includes(null)) {
      setErrorText("All fields are required.");
      return;
    }
    await handleAdd(filter.join(" "), queryType);
    setFilter([null, null, null]);
    setErrorText(null);
  };

  // handles change in dropdown option
  const onSelect = (value, index) => {
    let newList = [...filter];
    newList[index] = value;
    setFilter(newList);
  };

  return (
    <div className="query-container">
      <div className="query-title" id="filterby-title">Filter By:</div>
      <div>
        <div style={{ display: "flex" }}>
          <DropdownWithSearch
            list={tableMetaData[tableId]["columnList"]}
            label="Column List"
            onSelect={(value) => onSelect(value, 0)}
            value={filter[0]}
          />
          <DropdownWithSearch
            list={operators}
            label="Op."
            width={100}
            onSelect={(value) => onSelect(value, 1)}
            value={filter[1]}
          />
          <DropdownWithSearch
            list={top100Films}
            label="Value"
            onSelect={(value) => onSelect(value, 2)}
            value={filter[2]}
            freeSolo
          />
          <IconButton
            color="primary"
            aria-label="remove filter"
            component="span"
            onClick={addFilter}
          >
            <DoneOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
        {errorText && <div className="fontsize07 color-red">{errorText}</div>}
        <ChipsBox {...props} queryType={queryType} />
      </div>
    </div>
  );
};

export default FilterBy;
