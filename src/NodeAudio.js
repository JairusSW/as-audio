const Speaker = require('speaker')
// This outputs PCM data to the speaker.
const Prism = require('prism-media')
// Prism will make a nice and efficient ffmpeg stream converter.

const fs = require('fs')

const undici = require('undici')
// Undici is a extremely high-performance http client.
// You can then handle multiple streams with minumum overhead.

class Audio {
    constructor(src) {
        this.src = src
        this._initialized = false
        this._stop = false

        this._speaker = new Speaker({
            channels: 2,
            bitDepth: 16,
            sampleRate: 44100
        })

        this._transcoder = new Prism.FFmpeg({
            args: [
                "-analyzeduration", "0",
                "-loglevel", "0",
                '-ac', '2',
                '-b:a', '44100',
                '-f', 's16le'
            ]
        })
    }

    async play() {
        if (!this._input) {
            this._input = start(this.src, this._transcoder, this._speaker, this._stop)
        }
    }

    pause() { }

    stop() {
        this._stop = true
        if (this._input) this._transcoder.destroy()
    }

    set autoplay(toggle) {
        (async () => {
            if (toggle === true && !this._input) {
                this._input = await start(this.src, this._transcoder, this._speaker, this._stop)
            }
        })()
    }
}

async function start(src, transcoder, speaker, stop) {
    if (stop === true) return
    let input
    if (src.toString().toLowerCase().includes('http')) {
        // Handle streaming from URLs
        const res = await undici.request(src)
        input = res.body.pipe(transcoder)
        //input = needle.get(src).pipe(transcoder)
    } else {
        // Handle file streaming
        input = fs.createReadStream(src).pipe(transcoder)
    }
    input.pipe(speaker)
    return input
}

module.exports = Audio