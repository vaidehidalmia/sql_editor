import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

// user can input the table name they want to save the table as
// opens a dialog on button click
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

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleDialogOpen}>
        {saveDialogData.buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleDialogClose}
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
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {saveDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
