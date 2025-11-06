import React from "react";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
