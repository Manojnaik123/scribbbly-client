export type Player = {
    id: string
    name: string
    isHost: boolean
    avatarColor:  "blue" | "cyan" | "gray" | "green" | "orange" | "pink" | "purple" | "red" | "white" | "yellow"
    score?: number
    isDrawer?: boolean
    guessedCorrectly?: boolean
}



export type DrawStroke = {
    x1: number
    y1: number
    x2: number 
    y2: number
    color: string
    size: number
}

export type ChatMessage = {
    playerId: string
    player? : string
    points?: string
    text: string
    type: string
}