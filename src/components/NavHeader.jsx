import React from "react";
import logo from "../assets/invoicelogo.png";
function NavHeader() {
  return (
    <div className="p-2 w-full bg-black flex items-center rounded-md  border-b-2 border-indigo-500">
      <img src={logo} alt="..." className="ml-2" />
    </div>
  );
}

export default NavHeader;
