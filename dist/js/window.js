import { app, BrowserWindow } from "electron";
let url = require("url");
let path = require("path");
var ListenerType;
(function (ListenerType) {
    ListenerType[ListenerType["Ready"] = 0] = "Ready";
})(ListenerType || (ListenerType = {}));
class ElectronWindow {
    constructor() {
        app.on("ready", () => {
            this.win = new BrowserWindow({
                darkTheme: true,
                width: 1000,
                height: 800,
                resizable: true,
                maximizable: true
            });
            // Defaults
            this.win.setMenu(null);
            this.hide();
            this.maximize();
            // Load Page
            this.win.loadURL(url.format({
                pathname: path.join(__dirname, "..", "html", "index.html"),
                protocol: "file:",
                slashes: true
            }));
            // Closed event listener
            this.win.on("closed", function () {
                this.win = null;
            });
            // app.setBadgeCount(1);
            this.listener_ready();
        });
    }
    on(listener, func) {
        this.listener_ready = func;
    }
    show() {
        this.win.show();
    }
    hide() {
        this.win.hide();
    }
    maximize() {
        this.win.maximize();
    }
    minimize() {
        this.win.minimize();
    }
}
export { ElectronWindow, ListenerType as WindowClassListenerType };
