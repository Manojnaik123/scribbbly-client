import { LanguageType } from "./all-props";
import { ChatMessage, DrawStroke, Player } from "./player-prop";

type gamePhase = 'waiting' | 'selection' | 'drawing' | 'results'| 'gameEnded'


export type Room = {
    id: string

    players: Player[]

    gameStarted: boolean

    

    currentRound?: number

    gameEnded: boolean

    

    currentDrawerId?: string

    timeLeft?: number

    drawingData?: DrawStroke[]

    messages?: ChatMessage[]

    correctGuessedPlayerIds?: string[]


    maxRounds: number

    selectedLanguage?: LanguageType

    drawTime?: number

    maxPlayersCount? : number



    currentWord?: string

    wordsCollection? : string[]

    wordSelectionTime?: number


    pointsBoardTime? : number

    currentPhase?: gamePhase
    

}