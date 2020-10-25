import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SaveTableButton() {
  const [open, setOpen] = React.useState(false);
  const saveDialogData = {
    buttonTitle: "Save",
    title: "Save Table",
    description:
      "To save this table, please enter the table name you want to save it as below.",
    submitButtonText: "Save",
    fieldData: {
      id: "name",
      label: "Table Name",
      type: "text",
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        {saveDialogData.buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{saveDialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{saveDialogData.description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={saveDialogData.fieldData.id}
            label={saveDialogData.fieldData.label}
            type={saveDialogData.fieldData.type}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            {saveDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
