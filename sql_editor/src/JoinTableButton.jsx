import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleMenu from "./SimpleMenu";

import { otherTables, top100Films, joinType } from "./data/mockData";
import DropdownWithSearch from "./DropdownWithSearch";

export default function JoinTableButton(props) {
  const { currentTable } = props;
  const [open, setOpen] = useState(false);
  const [joinTableName, setJoinTableName] = useState();
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
              list={top100Films}
              label={`${currentTable} Column List`}
              disableClearable
              onSelect={() => {}}
              // onSelect={(value) => onSelect(value, 0)}
              // value={aggregate[0]}
            />
            <DropdownWithSearch
              list={top100Films}
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
