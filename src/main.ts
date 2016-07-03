const alm = require.resolve('alm/src/server')

interface PackageState {}

export function activate(state: PackageState) {

}

export function deactivate() {
}

export function serialize(): PackageState {
    return {};
}

export function deserialize() {
    /* do any tear down here */
}
