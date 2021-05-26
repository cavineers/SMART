import { app, BrowserWindow } from 'electron';
import { ServerCore } from './server-core';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('electron-reload')(__dirname, {
    electron: path.join('./', 'node_modules', '.bin', 'electron'),
});

app.whenReady().then(() => {
    ServerCore.createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) ServerCore.createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
