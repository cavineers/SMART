import { app, BrowserWindow } from "electron";
let url = require("url");
let path = require("path");
let win;
app.on("ready", () => {
    win = new BrowserWindow({
        darkTheme: true,
        width: 1000,
        height: 800
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "..", "html", "index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.setResizable(true);
    win.setMaximizable(true);
    win.maximize();
    win.setMenu(null);
    win.on("closed", function () {
        win = null;
    });
    app.setBadgeCount(1);
});
