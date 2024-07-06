import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-body-wrapper">
      <Outlet />
    </div>
  );
};

export default Layout;
