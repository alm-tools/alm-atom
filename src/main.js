"use strict";
var cp = require('child_process');
var alm = require.resolve('alm/src/server');
var getPort_1 = require('alm/src/server/utils/getPort');
function activate(state) {
    atom.commands.add('atom-workspace', 'typescript:alm', function (e) {
        var path = atom.project.getPaths()[0];
        if (!path) {
            atom.notifications.addInfo('You need to have a path open in atom to launch alm');
            return;
        }
        var BrowserWindow = require('electron').remote.BrowserWindow;
        function createWindow(url) {
            var win = new BrowserWindow({
                autoHideMenuBar: true,
                title: "alm.tools"
            });
            console.log({ url: url, path: path, alm: alm });
            win.toggleDevTools();
            win.loadURL(url);
            win.on('closed', function () {
                win = null;
            });
        }
        getPort_1.startPortSearch(4445, function (port) {
            var spawnEnv = (_a = {},
                _a['ATOM_SHELL_INTERNAL_RUN_AS_NODE'] = '1',
                _a
            );
            try {
                var child = cp.spawn(process.execPath, [
                    alm,
                    '-t',
                    port.toString(),
                ], {
                    cwd: path,
                    env: spawnEnv,
                });
                child.on('error', function (err) {
                    console.log('CHILD ERR ONERROR:', err.message, err.stack, err);
                });
                child.stderr.on('data', function (err) {
                    console.log({ err: err });
                });
                child.stdout.on('data', function (out) {
                    console.log({ out: out });
                });
                child.on('close', function (code) {
                    console.log({ code: code });
                });
            }
            catch (err) {
                console.log(err);
            }
            createWindow("http://127.0.0.1:" + port);
            var _a;
        });
    });
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
function serialize() {
    return {};
}
exports.serialize = serialize;
function deserialize() {
}
exports.deserialize = deserialize;
