export enum LETTEROWNER {
    available,
    Person,
    Computer,
    Board,
}

export enum GAMETERMS {
    MaxNumberLettersPerPlayer = 7,
}

export enum COMPUTERSKILLLEVEL {
    Easy = 'Easy',
    Medium = 'Medium',
    Sensei = 'Sensei',
}

export enum UserActions {
    STARTGAME = 'Start Game',
    SELECTCOMPUTERSKILLLEVEL = 'Select Computer Skill Level',
}

export const computerSkillLevel: string[] = [
    'Easy',
    'Medium',
    'Sensei',
]

export const wordHintType: string[] = [
    'Word',
    'Phonetic',
    'Origin',
    'Meaning',
    'Part of Speech',
    'Definition',
]

export const welcomeMessage =
    'Welcome! Here, you can play the boardgame scrabble. I played scrabble online but kept losing to the computer, so I decided to build my own variant where a computer could assist a person playing against the computer. After all, the only way to beat a computer is to use a computer! Enjoy!'

export interface freeDictionaryApiResponse {
    word: string
    phonetics: {
        audio: string
        text: string
        sourceUrl: string
        license: {
            name: string
            url: string
        }
    }[]
    meanings: {
        partOfSpeech: string
        definitions: {
            definition: string
            synonyms: string[]
            antonyms: string[]
            example?: string
        }[]
        synonyms: string[]
        antonyms: string[]
    }[]
    license: {
        name: string
        url: string
    }
    sourceUrls: string[]
}
