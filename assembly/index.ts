// @ts-ignore: Decorator
@external('audioBindings', '_initAudio')
declare function _initAudio(src: string): i32
// @ts-ignore: Decorator
@external('audioBindings', '_playAudio')
declare function _playAudio(id: i32): void
// @ts-ignore: Decorator
@external('audioBindings', '_pauseAudio')
declare function _pauseAudio(id: i32): void
// @ts-ignore: Decorator
@external('audioBindings', '_toggleAutoplay')
declare function _toggleAutoplay(id: i32): void

export class Audio {
    private id: i32 = -1
    constructor(src: string | null = null) {
        this.src = src
    }
    play(): void {
        _playAudio(this.id)
    }
    pause(): void {
        _pauseAudio(this.id)
    }
    set autoplay(toggle: boolean) {
        if (toggle) _toggleAutoplay(this.id)
    }
    set src(source: string | null) {
        if (source !== null) {
            this.id = _initAudio(changetype<string>(source))
        }
    }
}

export function test(): void {

    const audio = new Audio()

    audio.src = 'http://localhost:5000/audio.mp3'

    audio.play()

}