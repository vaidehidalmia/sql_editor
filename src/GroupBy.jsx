import React, { useState } from "react";
import DropdownWithSearch from "./DropdownWithSearch";

import IconButton from "@material-ui/core/IconButton";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import { tableMetaData } from "./data/mockData";
import ChipsBox from "./ChipsBox";

import './query.css';

const GroupBy = (props) => {
  const queryType = "groupBy";
  const [group, setGroup] = useState([null]);
  const [errorText, setErrorText] = useState(null);

  const addGroup = async () => {
    if (group.includes(null)) {
      setErrorText("All fields are required.");
      console.log("Error");
      return;
    }
    await props.handleAdd(group.join(" "), queryType);
    setGroup([null]);
    setErrorText(null);
  };

  const onSelect = (value, index) => {
    let newList = [...group];
    newList[index] = value;
    setGroup(newList);
  };

  return (
    <div className="query-container">
      <div className="query-title" id="groupby-title">Group By:</div>
      <div>
        <div style={{ display: "flex" }}>
          <DropdownWithSearch
            list={tableMetaData[props.tableId]["columnList"]}
            label="Column List"
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
        {errorText && <div className="fontsize07 color-red">{errorText}</div>}
        <ChipsBox {...props} queryType={queryType} />
      </div>
    </div>
  );
};

export default GroupBy;
