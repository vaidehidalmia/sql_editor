import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const DropdownWithSearch = (props) => {
  const { label, value, list, onSelect, disableClearable, width } = props;
  return (
    <Autocomplete
      className="dropdown-with-search"
      disableClearable={disableClearable}
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
