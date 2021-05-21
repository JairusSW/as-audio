declare function _initAudio(src: string): i32
// _initAudio will create a JS audio element, push it to an array, and send you the index.
// That way, it supports multiple instances, and you can access it.
// If an audio element is destoyed, it will be spliced out and a new id will be assigned to all.

declare function _playAudio(id: i32, src: string | null): void
// Plays audio based on ID. Looks in the array for ID and resumes.
declare function _pauseAudio(id: i32, src: string | null): void
// Same thing. Look above.
declare function _toggleAutoplay(id: i32, src: string | null): void
// Turns autoplay on

export class Audio {
    private id: i32 = -1
    public src: string | null = null
    constructor(src: string | null = null) {
        this.src = src
        this.id = _initAudio(src ? src : 'null')
        // ID will be the index of the audio element.
    }
    play(): void {
        if (isString(this.src)) {
            _playAudio(this.id, this.src)
        }
    }
    pause(): void {
        if (isString(this.src)) {
            _pauseAudio(this.id, this.src)
        }
    }
    set autoplay(toggle: boolean) {
        if (toggle === true) {
            _toggleAutoplay(this.id, this.src)
        }
    }
}