import { BrowserWindow } from "electron";
import * as path from "path";

export default class EWindow {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    private static onWindowAllClosed() {
        if (process.platform !== "darwin") {
            EWindow.application.quit();
        }
    }

    private static onClose() {
        EWindow.mainWindow = null;
    }

    private static onReady() {
        EWindow.mainWindow = new EWindow.BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
        EWindow.mainWindow.loadURL(path.join(__dirname, "index.html"));
        EWindow.mainWindow.on("closed", EWindow.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        EWindow.BrowserWindow = browserWindow;
        EWindow.application = app;
        EWindow.application.on("window-all-closed", EWindow.onWindowAllClosed);
        EWindow.application.on("ready", EWindow.onReady);
    }
}
