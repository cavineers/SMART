"use strict";
exports.__esModule = true;
var path = require("path");
var EWindow = (function () {
    function EWindow() {
    }
    EWindow.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            EWindow.application.quit();
        }
    };
    EWindow.onClose = function () {
        EWindow.mainWindow = null;
    };
    EWindow.onReady = function () {
        EWindow.mainWindow = new EWindow.BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
        EWindow.mainWindow.loadURL(path.join(__dirname, "index.html"));
        EWindow.mainWindow.on("closed", EWindow.onClose);
    };
    EWindow.main = function (app, browserWindow) {
        EWindow.BrowserWindow = browserWindow;
        EWindow.application = app;
        EWindow.application.on("window-all-closed", EWindow.onWindowAllClosed);
        EWindow.application.on("ready", EWindow.onReady);
    };
    return EWindow;
}());
exports["default"] = EWindow;
