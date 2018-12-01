
import React, { Component } from "react";
import { render } from "react-dom";
import Login from "login/login";
import "./login.scss";
const root = document.getElementById("root");
render(<Login></Login>, root, () => {
    console.log("%cWelcome to Hapi World!!!", "color: #ff6600")
});