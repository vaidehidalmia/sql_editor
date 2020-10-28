import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

// user can save the query by inputting the query name and description
// opens a dialog on button click
export default function SaveQueryButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  
  const saveQueryDialogData = {
    buttonTitle: "Save Query",
    title: "Save Query",
    description:
      "To save this query, please enter the query name and description you want to save it as below.",
    submitButtonText: "Save",
    fieldData: {
      name: {
        id: "name",
        label: "Query Name",
        type: "text",
      },
      description: {
        id: "description",
        label: "Query Description",
        type: "text",
      }
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        id="save-query-button"
        className="text-transform-initial"
        variant="contained"
        color="primary"
        disableElevation
        size="small"
        endIcon={<SaveIcon />}
        onClick={handleDialogOpen}
        >
        {saveQueryDialogData.buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{saveQueryDialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{saveQueryDialogData.description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={saveQueryDialogData.fieldData.name.id}
            label={saveQueryDialogData.fieldData.name.label}
            type={saveQueryDialogData.fieldData.name.type}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id={saveQueryDialogData.fieldData.description.id}
            label={saveQueryDialogData.fieldData.description.label}
            type={saveQueryDialogData.fieldData.description.type}
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
            {saveQueryDialogData.submitButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
