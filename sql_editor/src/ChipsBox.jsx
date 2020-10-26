import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  chipsBox: {
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "5px",
    marginTop: "10px",
    minHeight: "20px",
    maxHeight: "100px",
    overflowY: "scroll",
  },
  chipsContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  clearButton: {
    textTransform: "none",
    padding: 0,
    fontSize: "0.5rem",
  },
  chip: {
    borderRadius: "1px",
    backgroundColor: "#eff4f9",
    color: "#1d3557",
    fontWeight: "600",
  },
}));

const ChipsBox = (props) => {
  const classes = useStyles();

  const handleDelete = (text) => {
    props.handleDelete(text, props.queryType);
  };

  const handleDeleteAll = () => {
    props.handleDeleteAll(props.queryType);
  };

  return (
    <div className={classes.chipsBox}>
      {props.chipList.length > 0 && (
        <Button
          className={classes.clearButton}
          color="secondary"
          onClick={handleDeleteAll}
        >
          Clear All
        </Button>
      )}
      <div className={classes.chipsContainer}>
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
    </div>
  );
};

export default ChipsBox;
