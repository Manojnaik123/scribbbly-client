import { SOUND_VOLUME } from "@/utils/all-constants";

export function playSound(src: string) {
    const audio = new Audio(src)
    audio.volume = SOUND_VOLUME
    audio.play()
}