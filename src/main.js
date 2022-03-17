const { app, BrowserWindow } = require("electron");
const path = require("path");

let myWindow;

function createWindow() {
    myWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
            devTools: false            
        }
    });

    myWindow.loadFile(__dirname + "/index.html");
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});