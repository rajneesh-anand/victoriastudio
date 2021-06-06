import React from "react";
import Menu from "./menu/Menu";

function Header() {
  return (
    <div className="header">
      <Menu />
    </div>
  );
}

export default React.memo(Header);
