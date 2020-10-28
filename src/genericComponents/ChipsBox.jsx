import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Button } from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

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

// Chips container with functionality to add, delete, and clear all chips
const ChipsBox = (props) => {
  const { queryType, chipList } = props;
  const classes = useStyles();

  const handleDelete = (text) => {
    props.handleDelete(text, queryType);
  };

  const handleDeleteAll = () => {
    props.handleDeleteAll(queryType);
  };

  return (
    <div className={classes.chipsBox}>
      {/* button to clear all chips */}
      {chipList.length > 0 && (
        <Button
          className={classes.clearButton}
          color="secondary"
          onClick={handleDeleteAll}
        >
          Clear All
        </Button>
      )}
      {/* div that contains all the chips */}
      <div className={classes.chipsContainer}>
        {chipList.map((text) => (
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
