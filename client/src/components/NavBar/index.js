import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBBtn,
} from "mdbreact";

import { DASHBOARD, PROFILE, TASKS } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/profile";

const NavBar = (props) => {
  const [collapseID, setCollapseID] = useState("");
  const dispatch = useDispatch();

  const toggleCollapse = (newCollapseID) => () => {
    if (collapseID !== newCollapseID) {
      setCollapseID(newCollapseID);
    } else {
      setCollapseID("");
    }
  };

  const handleLogout = () => {
    let moveTo = () => {
      window.location.href = "/login";
    };
    dispatch(logout(moveTo));
  };
  return (
    <Navbar className="flexible-navbar" light expand="md" scrolling>
      <NavbarBrand href="/">Landing</NavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse("navbarCollapse13")} />
      <MDBCollapse id="navbarCollapse13" isOpen={collapseID} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to={DASHBOARD}>Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={PROFILE}>Profile</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={TASKS}>Tasks</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
      <MDBNavbarNav right>
        <MDBBtn onClick={handleLogout}>Log out</MDBBtn>
      </MDBNavbarNav>
    </Navbar>
  );
};

export default NavBar;
