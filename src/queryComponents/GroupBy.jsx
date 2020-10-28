import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import ChipsBox from "../genericComponents/ChipsBox";
import DropdownWithSearch from "../genericComponents/DropdownWithSearch";

import { tableMetaData } from "../data/mockData";

import './query.css';

// user can select column group rows
// this is the GROUP BY clause in SQL
const GroupBy = (props) => {
  const { handleAdd, tableId } = props;
  const queryType = "groupBy";
  const [group, setGroup] = useState([null]);
  const [errorText, setErrorText] = useState(null);

  // handles submit groupby
  const addGroup = async () => {
    if (group.includes(null)) {
      setErrorText("All fields are required.");
      return;
    }
    await handleAdd(group.join(" "), queryType);
    setGroup([null]);
    setErrorText(null);
  };

  // handles change in dropdown option
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
            list={tableMetaData[tableId]["columnList"]}
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
