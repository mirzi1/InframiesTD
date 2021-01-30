const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 1296,
        height: 759,
		minWidth: 1296,
		minHeight: 779,
        webPreferences: {
            nodeIntegration: true
        }
    })
	win.setMenuBarVisibility(false);
    win.loadFile('index.html');

}
 
app.whenReady().then(createWindow)