const { app, BrowserWindow, session, Menu } = require('electron');
const prompt = require('electron-prompt');
const path = require('path');
const fs = require('fs');

const isMac = process.platform === 'darwin';

var settings = { 'stream': '' };

const template = [{
  label: 'File',
  submenu: [
    {
      label: 'Set Stream...', role: 'connect', click() {

        prompt({
          title: 'Enter Stream',
          lable: 'Stream:',
          value: 'kuesasan',
          inputAttrs: {
            type: 'text'
          },
          type: 'input',
          alwaysOnTop: true,
          minHeight: 160
        }).then((r) => {
          if (r) {
            settings.stream = r;
            fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify(settings));
            app.relaunch();
            app.quit();
          }
        }).catch(console.error);
      }
    },
    { role: isMac ? 'close' : 'quit' }
  ]
}];

const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    title: 'KuesaChat',
    icon: path.join(__dirname, 'icon.png')
  });

  // Load user config
  const dataPath = path.join(app.getPath('userData'), 'config.json');

  try {
    if (fs.existsSync(dataPath)) {
      //file exists
      var data = fs.readFileSync(dataPath);
      var json = data.toString('utf8');
      settings = JSON.parse(json);
    } else {
      fs.writeFileSync(dataPath, JSON.stringify(settings));
    }
  } catch (e) {
    // Need to create file
    console.log(e);
  }

  session.defaultSession.loadExtension(path.join(__dirname, 'extensions/bttv')).then(() => {
    console.log('BTTV Loaded PogU');

    session.defaultSession.loadExtension(path.join(__dirname, 'extensions/ffz')).then(() => {
      console.log('FFZ Loaded PogU');

      if (!settings.stream) {
        win.loadFile('index.html').then(() => {
          win.setTitle('KuesaChat');
        });
        return;
      };

      win.loadURL(`https://www.twitch.tv/popout/${settings.stream}/chat`).then(() => {
        // Set title of window
        win.setTitle('KuesaChat - ' + settings.stream);

        // Sets dark theme
        win.webContents.executeJavaScript("window.localStorage.setItem('twilight.theme', 1);");

        // Hides the regular header, hype trains, predictions
        win.webContents.executeJavaScript("document.body.setAttribute('id', 'body');var css = document.createElement('style'); css.type = 'text/css'; css.innerText = '#body .stream-chat-header, #body .channel-leaderboard, #body .community-highlight-stack__scroll-area--disable, #body .community-points-summary, #body .community-highlight-stack__backlog-card {display: none!important;} #body .tw-mg-t-1 {margin-top: 0!important;}'; document.head.appendChild(css);");

        // Hides channel point button
        win.webContents.executeJavaScript("document.getElementsByClassName('community-points-summary')[0].parentNode.parentNode.parentNode.remove();");

        // Rearranges chat
        win.webContents.executeJavaScript("document.getElementsByClassName('chat-input__textarea')[0].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'flex';");
        win.webContents.executeJavaScript("document.getElementsByClassName('chat-input__textarea')[0].parentNode.parentNode.parentNode.parentNode.style.width = '100%';");
      });
    }).catch(err => console.log(err));


  }).catch(err => console.log(err));
}



app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})