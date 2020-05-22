const { app, BrowserWindow }= require('electron');

app
  .whenReady()
  .then(createWindow);

app.on('window-all-closed', () => {
  // Em macOS, é comum apps manterem ativos mesmo fechando as janelas.
  if (process.platform === 'darwin') return;

  app.quit();
});

app.on('activate', () => {
  // Na ativação pelo ícone do app no docker, é comum recriar a janela quando não houverem outras
  if (BrowserWindow.getAllWindows().length > 0) return;
  
  createWindow();
})

function createWindow() {
  const win = new BrowserWindow({ 
    width: 600, height: 480, 
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}