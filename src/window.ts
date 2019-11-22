import { app, BrowserWindow } from "electron";
let url = require("url");
let path = require("path");

enum ListenerType {
    Ready = 0
}

class ElectronWindow {
    public win: BrowserWindow;
    private listener_ready: any;
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
            this.win.loadURL(
                url.format({
                    pathname: path.join(__dirname, "..", "html", "index.html"),
                    protocol: "file:",
                    slashes: true
                })
            );

            // Closed event listener
            this.win.on("closed", function() {
                this.win = null;
            });

            // app.setBadgeCount(1);
            this.listener_ready();
        });
    }

    on(listener: ListenerType, func: any): void {
        this.listener_ready = func;
    }

    show(): void {
        this.win.show();
    }

    hide(): void {
        this.win.hide();
    }

    maximize(): void {
        this.win.maximize();
    }

    minimize(): void {
        this.win.minimize();
    }
}

export { ElectronWindow, ListenerType as WindowClassListenerType };
