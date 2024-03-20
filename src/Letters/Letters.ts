import { LETTEROWNER } from '../enums'

export interface ILetter {
    character: string
    turnPlacedOnBoard: null | number
    owner: null | number
    pointValue: number
    uniqueIdentifier: string
}

export interface ILetters {
    available: ILetter[]
    computer: ILetter[]
    person: ILetter[]
    board: ILetter[]
}

type LetterTuple = [string, number, number]

export const letterScrabbleAttributes: LetterTuple[] = [
    // character, occurrenceFrequency, pointValue
    ['a', 9, 1],
    ['b', 2, 3],
    ['c', 2, 3],
    ['d', 4, 2],
    ['e', 12, 1],
    ['f', 2, 4],
    ['g', 3, 2],
    ['h', 2, 4],
    ['i', 9, 1],
    ['j', 1, 8],
    ['k', 1, 5],
    ['l', 4, 1],
    ['m', 2, 3],
    ['n', 6, 1],
    ['o', 8, 1],
    ['p', 2, 3],
    ['q', 1, 10],
    ['r', 6, 1],
    ['s', 4, 1],
    ['t', 6, 1],
    ['u', 4, 1],
    ['v', 2, 4],
    ['w', 2, 4],
    ['x', 1, 8],
    ['y', 2, 4],
    ['z', 1, 10],
    [' ', 2, 0],
]

export function initializeLetterObjects(): ILetter[] {
    const availableStartingLetters: ILetter[] = []

    letterScrabbleAttributes.forEach((letter) => {
        const character: string = letter[0]
        const occurrenceFrequency: number = letter[1]
        const pointValue: number = letter[2]

        for (let i = 0; i < occurrenceFrequency; i++) {
            const newLetter: ILetter = {
                character: character,
                owner: LETTEROWNER.available,
                pointValue: pointValue,
                turnPlacedOnBoard: null,
                uniqueIdentifier: getUniqueId(),
            }

            availableStartingLetters.push(newLetter)
        }
    })

    return availableStartingLetters
}

function getUniqueId(): string {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 10) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}
