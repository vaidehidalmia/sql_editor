import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { tableMetaData } from "../data/mockData";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "-webkit-fill-available",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ShowHideColumns(props) {
  const classes = useStyles();
  let tableColumns = tableMetaData[props.tableId]["columnList"];
  const [showColumns, setShowColumns] = useState([tableColumns]);

  const handleChange = (event) => {
    const show = event.target.value;
    setShowColumns(show);
    const hide = tableColumns.filter(x => !show.includes(x));
    props.handleShowHideColumnsChange(hide);
  };

  useEffect(()=> {
    tableColumns = tableMetaData[props.tableId]["columnList"];
    setShowColumns(tableColumns);
  }, [props.tableId])

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Show Columns</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={showColumns}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          fullWidth
        >
          {tableColumns.map((column) => (
            <MenuItem key={column} value={column}>
              <Checkbox checked={showColumns.indexOf(column) > -1} className={classes.checkbox}/>
              <ListItemText primary={column} className={classes.checkbox} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}