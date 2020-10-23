import React, { useState } from "react";
import DropdownWithSearch from "./DropdownWithSearch";

import IconButton from "@material-ui/core/IconButton";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import { top100Films, operators } from "./data/mockData";
import ChipsBox from "./ChipsBox";

const FilterRow = (props) => {
  const [filter, setFilter] = useState([null, null, null]);
  const addFilter = async () => {
    if (filter.includes(null)) {
      console.log(filter);
      console.log("Error");
      return;
    }
    await props.handleAdd(filter.join(" "), "filters");
    setFilter([null, null, null]);
  };

  const onSelect = (value, index) => {
    let newList = [...filter];
    newList[index] = value;
    setFilter(newList);
  };

  return (
    <>
      <div>Filter By:</div>
      <div style={{ display: "flex" }}>
        <DropdownWithSearch
          list={top100Films}
          label="Column List"
          disableClearable
          onSelect={(value) => onSelect(value, 0)}
          value={filter[0]}
        />
        <DropdownWithSearch
          list={operators}
          label="Op."
          width={100}
          disableClearable
          onSelect={(value) => onSelect(value, 1)}
          value={filter[1]}
        />
        <DropdownWithSearch
          list={top100Films}
          label="Value"
          disableClearable
          onSelect={(value) => onSelect(value, 2)}
          value={filter[2]}
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
      <ChipsBox {...props} queryType="filters" />
    </>
  );
};

export default FilterRow;
