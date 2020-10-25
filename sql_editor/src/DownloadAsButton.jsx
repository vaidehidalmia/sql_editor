import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleMenu from "./SimpleMenu";

import { downloadAs } from "./data/mockData";

export default function DownloadAsButton() {
  const [open, setOpen] = useState(false);
  const [downloadAsDialogTitle, setDownloadAsDialogTitle] = useState();
  const [
    downloadAsDialogDescription,
    setDownloadAsDialogDescription,
  ] = useState();
  const downloadAsDialogData = {
    buttonTitle: "Download As",
    submitButtonText: "Download",
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
    setDownloadAsDialogTitle(`Download Table As ${item}`);
    setDownloadAsDialogDescription(
      `To download this table as a ${item}, please enter the file name you want to save it as below.`
    );
  };

  return (
    <div>
      <SimpleMenu
        list={downloadAs}
        label={downloadAsDialogData.buttonTitle}
        handleItemClick={handleItemClick}
      />
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {downloadAsDialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{downloadAsDialogDescription}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={downloadAsDialogData.fieldData.id}
            label={downloadAsDialogData.fieldData.label}
            type={downloadAsDialogData.fieldData.type}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {downloadAsDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
