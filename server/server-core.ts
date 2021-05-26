import { BrowserWindow } from 'electron';

export class ServerCore {
    public static createWindow() {
        const win = new BrowserWindow({
            width: 800,
            height: 700,
        });
        win.loadFile('./views/index.html');
    }
}
