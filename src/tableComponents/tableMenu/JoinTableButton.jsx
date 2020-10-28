import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

import SimpleMenu from "../../genericComponents/SimpleMenu";
import DropdownWithSearch from "../../genericComponents/DropdownWithSearch";

import { otherTables, joinType, tableMetaData } from "../../data/mockData";


// user can select which table they want to join the current table with
// dropdown menu which opens a dialog on menu item click
export default function JoinTableButton(props) {
  const { currentTable } = props;
  const [open, setOpen] = useState(false);
  const [joinTableName, setJoinTableName] = useState("customers");
  const [joinTableDialogTitle, setJoinTableDialogTitle] = useState();
  
  const joinTableDialogData = {
    buttonTitle: "Join Table",
    joinDescription:
      "Select the join type and columns you want to join on below.",
    fileNameDescription:
      "Enter the table name you want to save the joined table as below.",
    submitButtonText: "Join",
    fieldData: {
      id: "name",
      label: "File Name",
      type: "text",
    },
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  // handles menu item click
  const handleItemClick = (e) => {
    handleDialogOpen();
    const item = e.target.innerText;
    setJoinTableName(item);
    setJoinTableDialogTitle(`Join with ${item} Table`);
  };

  return (
    <div>
      <SimpleMenu
        list={otherTables}
        label={joinTableDialogData.buttonTitle}
        handleItemClick={handleItemClick}
      />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{joinTableDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {joinTableDialogData.joinDescription}
          </DialogContentText>
          <DropdownWithSearch
            list={joinType}
            label="Join Type"
            disableClearable
            onSelect={() => {}}
            // onSelect={(value) => onSelect(value, 0)}
            // value={aggregate[0]}
          />
          <div style={{ display: "flex" }}>
            <DropdownWithSearch
              list={tableMetaData[currentTable]["columnList"]}
              label={`${currentTable} Column List`}
              disableClearable
              onSelect={() => {}}
              // onSelect={(value) => onSelect(value, 0)}
              // value={aggregate[0]}
            />
            <DropdownWithSearch
              list={tableMetaData[joinTableName]["columnList"]}
              label={`${joinTableName} Column List`}
              disableClearable
              onSelect={() => {}}
              // onSelect={(value) => onSelect(value, 1)}
              // value={aggregate[1]}
            />
          </div>
          <DialogContentText>
            {joinTableDialogData.fileNameDescription}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={joinTableDialogData.fieldData.id}
            label={joinTableDialogData.fieldData.label}
            type={joinTableDialogData.fieldData.type}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {joinTableDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
