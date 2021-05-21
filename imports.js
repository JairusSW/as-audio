const Audio = require('./src/NodeAudio')

class AudioImport {
    constructor(options = {
        asBind: false
    }) {

        if (!options['asBind']) options.asBind = false

        this.audioElements = []
        this._exports = null
        this.wasmImports = {
            audio: {
                _initAudio: (src) => {
                    const link = (options['asBind'] === true) ? src : this._exports.__getString(src)
                    if (link === 'null') return this.audioElements.push(new Audio(null))
                    this.audioElements.push(new Audio(link))
                },
                _playAudio: (id, src) => {
                    const audioElement = this.audioElements[id]
                    if (!audioElement) return
                    if (!audioElement.src) audioElement.src = (options['asBind'] === true) ? src : this._exports.__getString(src)
                    audioElement.play()
                },
                _pauseAudio: (id, src) => {
                    const audioElement = this.audioElements[id]
                    if (!audioElement) return
                    if (!audioElement.src) audioElement.src = (options['asBind'] === true) ? src : this._exports.__getString(src)
                    audioElement.pause()
                },
                _toggleAutoplay: (id, src) => {
                    const audioElement = this.audioElements[id]
                    if (!audioElement) return
                    if (!audioElement.src) audioElement.src = (options['asBind'] === true) ? src : this._exports.__getString(src)
                    audioElement.autoplay = true
                }
            }
        }
    }

    get wasmExports() {
        return this._exports
    }

    set wasmExports(e) {
        this._exports = e
    }

    getFn(fnIndex) {
        if (!this.wasmExports)
            throw new Error(
                'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
            )
        if (!this._exports.table.get) return () => {
            throw new Error('Uh oh! Make sure to add the --exportTable flag to your compile script!')
        }
        return this._exports.table.get(fnIndex)
    }
}

module.exports = AudioImport