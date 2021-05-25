const crossAudio = (() => {
    if (typeof require === 'function') {
        return require('./src/NodeAudio')
    }
    return Audio
})()

export class AudioImport {
    constructor(options = {
        asBind: false
    }) {

        if (!options['asBind']) options.asBind = false

        this.audioElements = []
        this._exports = null
        this.wasmImports = {
            audioBindings: {
                _initAudio: (src) => {
                    const link = this._exports.__getString(src)
                    this.audioElements.push(new crossAudio(link))
                    return this.audioElements.length - 1
                },
                _playAudio: (id) => {
                    const audioElement = this.audioElements[id]
                    if (audioElement) audioElement.play()
                },
                _pauseAudio: (id) => {
                    const audioElement = this.audioElements[id]
                    if (audioElement) audioElement.pause()
                },
                _toggleAutoplay: (id) => {
                    const audioElement = this.audioElements[id]
                    if (audioElement) audioElement.autoplay = true
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