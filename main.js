const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    title: 'Yogvan Holidays', // Set your custom title here
    icon: path.join(__dirname, 'yogvan.png'), // Set path to your custom icon
  });

  // Make menu bar invisible
  win.setMenu(null);

  // Load your website URL
  win.loadURL('http://localhost:7000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
