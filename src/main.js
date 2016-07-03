"use strict";
var alm = require.resolve('alm/src/server');
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
            win.loadURL(url);
            win.on('closed', function () {
                win = null;
            });
        }
        createWindow('http://google.com');
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
