import cp = require('child_process');

declare var atom: any;
const alm = require.resolve('alm/src/server')
import {startPortSearch} from 'alm/src/server/utils/getPort';

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
        function createWindow(url: string) {
            // Create the browser window.
            let win = new BrowserWindow({
                autoHideMenuBar: true,
                title: "alm.tools"
            });

            console.log({ url, path, alm }); // DEBUG

            // and load the index.html of the app.
            win.loadURL(url);

            // Emitted when the window is closed.
            win.on('closed', () => {
                win = null;
            });
        }

        startPortSearch(4445, (port) => {
            var spawnEnv = {
                ['ATOM_SHELL_INTERNAL_RUN_AS_NODE']: '1'
            };

            try {
                let child = cp.spawn(process.execPath, [
                    alm,
                    '-t',
                    port.toString(),
                ], {
                        cwd: path,
                        env: spawnEnv,
                    });

                child.on('error', (err) => {
                    console.log('CHILD ERR ONERROR:', err.message, err.stack, err);
                });
                child.stderr.on('data', (err) => {
                    console.log({ err });
                });
                child.stdout.on('data', (out) => {
                    console.log({ out });
                });
                child.on('close', (code) => {
                    console.log({ code });
                });

            } catch (err) {
                console.log(err);
            }

            createWindow(`http://localhost:${port}`);
        })
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
