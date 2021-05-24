const fs = require("fs");
const loader = require("@assemblyscript/loader")
const Audio = require('../imports')
const audio = new Audio()
const imports = {
    ...audio.wasmImports
}
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname.replace('\\src', '') + "/build/untouched.wasm"), imports);
audio.wasmExports = wasmModule.exports
module.exports = wasmModule.exports;
wasmModule.exports.test()