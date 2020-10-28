import React, { useState } from "react";
import DropdownWithSearch from "./DropdownWithSearch";

import IconButton from "@material-ui/core/IconButton";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import { tableMetaData, aggregateFunctions } from "./data/mockData";
import ChipsBox from "./ChipsBox";

import './query.css';

const AggregateBy = (props) => {
  const queryType = "aggregateBy";
  const [aggregate, setAggregate] = useState([null, null]);
  const [errorText, setErrorText] = useState(null);

  const addAggregate = async () => {
    if (aggregate.includes(null)) {
      setErrorText("All fields are required.");
      console.log("Error");
      return;
    }
    await props.handleAdd(aggregate[1] + " of " + aggregate[0], queryType);
    setAggregate([null, null]);
    setErrorText(null);
  };

  const onSelect = (value, index) => {
    let newList = [...aggregate];
    newList[index] = value;
    setAggregate(newList);
  };

  return (
    <div className="query-container">
      <div className="query-title" id="aggregateby-title">Aggregate By:</div>
      <div>
        <div className="fontsize07 margin2">Columns are aggregated by <span className="bold">count by default</span></div>
        <div style={{ display: "flex" }}>
          <DropdownWithSearch
            list={tableMetaData[props.tableId]["columnList"]}
            label="Column List"
            onSelect={(value) => onSelect(value, 0)}
            value={aggregate[0]}
          />
          <DropdownWithSearch
            list={aggregateFunctions}
            label="Function"
            onSelect={(value) => onSelect(value, 1)}
            value={aggregate[1]}
          />
          <IconButton
            color="primary"
            aria-label="remove aggregate"
            component="span"
            onClick={addAggregate}
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

export default AggregateBy;
