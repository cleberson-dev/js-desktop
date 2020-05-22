const { app, BrowserWindow }= require('electron');

app
  .whenReady()
  .then(createWindow);

function createWindow() {
  const win = new BrowserWindow({ 
    width: 600, height: 480, 
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}