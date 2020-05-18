"use strict";
exports.__esModule = true;
console.clear();
var Constants_1 = require("./Constants");
var window_1 = require("./window");
var electron_1 = require("electron");
console.log("Starting " + Constants_1["default"].app_name.short);
var k_window;
window_1["default"].main(electron_1.app, electron_1.BrowserWindow);
