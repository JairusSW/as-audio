import { Audio } from '../node_modules/audio.as/assembly/audio'

export function test(): void {

    const audio = new Audio('http://localhost:5000/audio.mp3')

    audio.autoplay = true

}