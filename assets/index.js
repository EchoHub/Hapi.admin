import React, { Component } from "react";
import { render } from "react-dom";
import AdminSystem from "adminSystem/adminSystem";
import "./index.scss";
const root = document.getElementById("root");
render(<AdminSystem theme="primary"></AdminSystem>, root, () => {
    console.log("%cWelcome to Hapi World!!!", "color: #ff6600")
});