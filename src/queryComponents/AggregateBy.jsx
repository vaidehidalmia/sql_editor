import React, { useState } from "react";

import { IconButton } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import DropdownWithSearch from "../genericComponents/DropdownWithSearch";
import ChipsBox from "../genericComponents/ChipsBox";

import { tableMetaData, aggregateFunctions } from "../data/mockData";

import './query.css';

// user can select column, aggregate fn to view rows
// this is the aggregate functions in SQL
const AggregateBy = (props) => {
  const { handleAdd, tableId } = props;
  const queryType = "aggregateBy";
  const [aggregate, setAggregate] = useState([null, null]);
  const [errorText, setErrorText] = useState(null);

  // handles submit aggregate
  const addAggregate = async () => {
    if (aggregate.includes(null)) {
      setErrorText("All fields are required.");
      return;
    }
    await handleAdd(aggregate[1] + " of " + aggregate[0], queryType);
    setAggregate([null, null]);
    setErrorText(null);
  };

  // handles change in dropdown option
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
            list={tableMetaData[tableId]["columnList"]}
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
