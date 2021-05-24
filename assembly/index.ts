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
    private src: string | null = null
    constructor(src: string | null = null) {
        if (src !== null) {
            
            this.id = _initAudio(changetype<string>(src))

        }
    }
    play(): void {
        if (isString(this.src)) {
            _playAudio(this.id)
        }
    }
    pause(): void {
        if (isString(this.src)) {
            _pauseAudio(this.id)
        }
    }
    set autoplay(toggle: boolean) {
        if (toggle === true) {
            _toggleAutoplay(this.id)
        }
    }
}

export function test(): void {

    const audio = new Audio('http://localhost:5000/audio.mp3')

    audio.play()

}