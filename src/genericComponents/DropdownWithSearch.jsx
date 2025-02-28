import React from "react";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

// dropdown list which can be searched
const DropdownWithSearch = (props) => {
  const { label, value, list, onSelect, disableClearable, width, freeSolo } = props;
  return (
    <Autocomplete
      className="dropdown-with-search"
      disableClearable={disableClearable}
      freeSolo={freeSolo}
      options={list}
      style={{ width: width || 200, padding: "2px" }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, v) => onSelect(v)}
      value={value}
      size="small"
    />
  );
};

export default DropdownWithSearch;
