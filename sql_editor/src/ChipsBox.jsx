import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    textTransform: "none",
    paddingBottom: 0,
  },
  chip: {
    borderRadius: 0,
  },
}));

const ChipsBox = (props) => {
  const classes = useStyles();

  const handleDelete = (text) => {
    props.handleDelete(text);
  };

  const handleDeleteAll = () => {
    props.handleDeleteAll();
  };

  return (
    <>
      {props.chipList.length > 0 && (
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleDeleteAll}
        >
          Clear All
        </Button>
      )}
      <div className={classes.root}>
        {props.chipList.map((text) => (
          <Chip
            key={text}
            className={classes.chip}
            variant="outlined"
            size="small"
            label={text}
            onDelete={() => handleDelete(text)}
            deleteIcon={<ClearOutlinedIcon />}
          />
        ))}
      </div>
    </>
  );
};

export default ChipsBox;
