import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

const SimpleMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (e) => {
    handleMenuClose();
    if (props.handleItemClick) {
      props.handleItemClick(e);
    }
  };

  return (
    <div>
      <Button
        // aria-controls="simple-menu"
        // aria-haspopup="true"
        onClick={handleButtonClick}
        endIcon={<ExpandMoreOutlinedIcon />}
        color="inherit"
      >
        {props.label}
      </Button>
      <Menu
        // id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {props.list.map((element) => (
          <MenuItem key={element} onClick={handleMenuItemClick}>
            {element}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SimpleMenu;
