import React from "react";
import ReactDOM from "react-dom";
import ReactFCCtest from "react-fcctest";
import Editor from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Editor />
    <ReactFCCtest />
  </React.StrictMode>,
  document.getElementById("root")
);
