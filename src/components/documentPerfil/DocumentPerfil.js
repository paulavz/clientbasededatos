import React from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";

export default function DocumentPerfil() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div style={{ width: "800px" }}></div>
        <Rightbar />
      </div>
    </>
  );
}
