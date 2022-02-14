import React from "react";
import NavBar from "../components/NavBar";

/**
 * This layout is applied on all the website so the navbar is always displayed
 * @param children
 * @constructor
 */
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layout;
