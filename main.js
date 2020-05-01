
const {app, BrowserWindow, screen} = require('electron');

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');


/**
 * Create the a window for the application
 * @return {object}
 */
function createWindow() {
  // Create a browser window.
  const win = new BrowserWindow({
    width: screen.getPrimaryDisplay().size.width / 2,
    height: screen.getPrimaryDisplay().size.height / 2,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
    },
  });

  win.loadURL('http://localhost:3000');

  win.on('closed', () => {
    app.quit();
  });

  return win;
}

/**
 * Create all of the windows and install extensions
 */
function createWindows() {
  createWindow();
  createWindow();

  console.dir(BrowserWindow.getDevToolsExtensions());
  installExtension(REDUX_DEVTOOLS)
    .then((name) => {
      console.log('Added Extension: ' + name);
    })
    .catch((err) => {
      console.log('An error occurred: ', err);
    });

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => {
      console.log('Added Extension: ' + name);
    })
    .catch((err) => {
      console.log('An error occurred: ', err);
    });
}


app.commandLine.appendSwitch('no-sandbox');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindows);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
