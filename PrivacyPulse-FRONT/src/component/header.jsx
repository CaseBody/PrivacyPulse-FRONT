import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Privacy Pulse
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">contact</Button>
          <Avatar alt="User Avatar" src="/" />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
