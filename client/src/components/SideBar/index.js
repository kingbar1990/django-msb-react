import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DASHBOARD, PROFILE } from "../../constants/routes";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../../store/actions/profile";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerHeaderProfile: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  drawerHeaderProfileName: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar,
    minHeight: "45px",
    justifyContent: "space-between",
  },
  menuSubItem: {
    color: "#9E9E9E",
    fontWeight: 400,
    fontSize: "14px",
    margin: "15px 20px",
  },
  spacing: {
    padding: "10px 0",
  },
  large: {
    width: "40px",
    height: "40px",
  },
  logout: {
    cursor: "pointer",
  },
}));

const Sidebar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    let moveTo = () => {
      window.location.href = "/login";
    };
    dispatch(logout(moveTo));
  };

  const theme = useTheme();
  return (
    <>
      {profile ? (
        <>
          <div className={classes.drawerHeaderProfile}>
            <Avatar
              alt={profile.username}
              src={profile.avatar}
              className={classes.large}
            />
            <IconButton onClick={props.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <div className={classes.drawerHeaderProfileName}>
            <Typography>{profile.username}</Typography>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {Boolean(anchorEl) ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            <Popover
              id={"KeyboardArrowDownIcon"}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={2} className={classes.logout} onClick={handleLogout}>
                <Typography className={classes.typography}>Log out</Typography>
              </Box>
            </Popover>
          </div>
        </>
      ) : (
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      )}

      <Divider />
      <div className={classes.spacing}>
        <NavLink exact={true} to={DASHBOARD} activeClassName="activeClass">
          <ListItem>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
      </div>

      <Divider />
      <Typography className={classes.menuSubItem}>Settings</Typography>
      <List component="nav" aria-label="secondary mailbox folder">
        <NavLink to={PROFILE} activeClassName="activeClass">
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Main Settings" />
          </ListItem>
        </NavLink>
      </List>
    </>
  );
};

export default Sidebar;
