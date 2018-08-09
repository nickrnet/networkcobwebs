const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true
});
let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    // TODO: go frameless (a la Spotify/Slack), but need window drag/resize
    // mainWindow = new BrowserWindow({width: 800, height: 600, frame: false});
    // mainWindow.loadFile('index.html');
    // mainWindow.loadFile('build/index.html');
    mainWindow.loadURL(startUrl);
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
