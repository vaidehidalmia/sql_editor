import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

import SimpleMenu from "../../genericComponents/SimpleMenu";

import { reports } from "../../data/mockData";

// user can select which report to append the table to, able to add comments
// dropdown menu which opens a dialog on menu item click
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

  // handles menu item click
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
