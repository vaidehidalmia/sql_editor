import React, { useState } from "react";
import DropdownWithSearch from "./DropdownWithSearch";

import IconButton from "@material-ui/core/IconButton";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import { top100Films } from "./data/mockData";
import ChipsBox from "./ChipsBox";

const GroupBy = (props) => {
  const queryType = "groupBy";
  const [group, setGroup] = useState([null]);
  const addGroup = async () => {
    if (group.includes(null)) {
      console.log("Error");
      return;
    }
    await props.handleAdd(group.join(" "), queryType);
    setGroup([null]);
  };

  const onSelect = (value, index) => {
    let newList = [...group];
    newList[index] = value;
    setGroup(newList);
  };

  return (
    <>
      <div>Group By:</div>
      <div style={{ display: "flex" }}>
        <DropdownWithSearch
          list={top100Films}
          label="Column List"
          disableClearable
          onSelect={(value) => onSelect(value, 0)}
          value={group[0]}
        />
        <IconButton
          color="primary"
          aria-label="remove group"
          component="span"
          onClick={addGroup}
        >
          <DoneOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
      <ChipsBox {...props} queryType={queryType} />
    </>
  );
};

export default GroupBy;
