import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleMenu from "./SimpleMenu";

import { reports } from "./data/mockData";

export default function AddToReportButton() {
  const [open, setOpen] = useState(false);
  const [addToReportDialogTitle, setAddToReportDialogTitle] = useState();
  const [
    addToReportDialogDescription,
    setAddToReportDialogDescription,
  ] = useState();
  const addToReportDialogData = {
    buttonTitle: "Add to Report",
    submitButtonText: "Add",
    fieldData: {
      id: "name",
      label: "Comments",
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
    setAddToReportDialogTitle(`Add to ${item} Report`);
    setAddToReportDialogDescription(
      `This table will be appended to ${item}. Write any comments you would like to add with regards to the table below.`
    );
  };

  return (
    <div>
      <SimpleMenu
        list={reports}
        label={addToReportDialogData.buttonTitle}
        handleItemClick={handleItemClick}
      />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {addToReportDialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{addToReportDialogDescription}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={addToReportDialogData.fieldData.id}
            label={addToReportDialogData.fieldData.label}
            type={addToReportDialogData.fieldData.type}
            fullWidth
            multiline
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {addToReportDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
