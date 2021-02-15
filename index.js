const { app, BrowserWindow, Menu, session } = require('electron');

/** Force disable security warning */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    /** Icon */
    icon: "./icon.png",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  /** Maximize Window when launch */
  win.maximize();

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  /** For SkyWay */
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = 'electron://localhost';
    callback({
      cancel: false,
      requestHeaders: details.requestHeaders
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
app.on('ready', () => {
  createWindow();
  /** Custom Menu */
  let template = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Quit',
          click: () => {
            app.quit();
          },
          accelerator: "CommandOrControl+Q"
        },
        {
          label: 'Toggle Developer Tools',
          click: () => {
            win.webContents.toggleDevTools()
          },
          accelerator: "F12"
        },
        {
          label: 'Reload',
          click: () => {
            win.reload();
          },
          accelerator: "F5"
        },
        {
          label: 'Mascot',
          click: (item, focusedWindow) => {
            if (focusedWindow)
            focusedWindow.webContents.executeJavaScript('ugj_selectMascot()');
          },
          accelerator: "CommandOrControl+M"
        },
        {
          label: 'About',
          click: () => {
            var os = require('os');
            var detail = 'Version: ' + process.env.npm_package_version + '\n'
              + 'Node.js: ' + process.versions.node + '\n'
              + 'Chrome: ' + process.versions.chrome + '\n'
              + 'Electron: ' + process.versions.electron + '\n'
              + 'V8: ' + process.versions.v8 + '\n'
              + 'OS: ' + os.type + ' ' + os.arch + ' ' + os.version + ' ' + os.release;
            var options = {
              type: 'info',
              buttons: ['OK'],
              title: 'OCoGe',
              message: 'OCoGe - Oiwa Code Generator',
              detail: detail
            };
            require('electron').dialog.showMessageBox(win, options);
          },
          accelerator: "CommandOrControl+I"
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  win.setMenuBarVisibility(false);
})


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

