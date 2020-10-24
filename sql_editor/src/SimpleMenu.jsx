import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

const SimpleMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    const element = e.target.innerText;
    // if (element) {
    //   props.onMenuItemClick(element);
    // }
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
          <MenuItem key={element} onClick={handleMenuClose}>
            {element}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SimpleMenu;
