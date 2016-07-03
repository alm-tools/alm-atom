declare var atom: any;
const alm = require.resolve('alm/src/server')

interface PackageState { }

export function activate(state: PackageState) {
    atom.commands.add('atom-workspace', 'typescript:alm', (e) => {
        const path = atom.project.getPaths()[0];
        if (!path) {
            atom.notifications.addInfo('You need to have a path open in atom to launch alm');
            return;
        }

        // Module to create native browser window.
        const BrowserWindow = require('electron').remote.BrowserWindow;

        function createWindow(url:string) {
          // Create the browser window.
          let win = new BrowserWindow({
            autoHideMenuBar: true,
            title: "alm.tools"
          });

          // and load the index.html of the app.
          win.loadURL(url);

          // Emitted when the window is closed.
          win.on('closed', () => {
            win = null;
          });
        }

        createWindow('http://google.com');

    });
}

export function deactivate() {
}

export function serialize(): PackageState {
    return {};
}

export function deserialize() {
    /* do any tear down here */
}
