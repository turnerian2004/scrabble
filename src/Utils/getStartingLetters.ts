import { GAMETERMS } from '../enums'
import { ILetter } from '../Letters/Letters'

export function distributeLettersAtGameStart(
    letters: ILetter[]
): [
    availableLetters: ILetter[],
    personLetters: ILetter[],
    computerLetters: ILetter[]
] {
    const availableLetters = [...letters]

    const [availableLetters1, computerLetters] =
        getPlayerLetters(availableLetters)

    const [availableLetters2, personLetters] =
        getPlayerLetters(availableLetters1)

    return [availableLetters2, personLetters, computerLetters]
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

function getPlayerLetters(
    availableLetters: ILetter[]
): [availableLetters: ILetter[], playerLetters: ILetter[]] {
    let letters: ILetter[] = [...availableLetters]
    const playerLetters: ILetter[] = []

    for (let i = 0; i < GAMETERMS.MaxNumberLettersPerPlayer; i++) {
        const letterIndex: number = getRandomInt(letters.length)
        const playerLetter: ILetter = letters[letterIndex]
        playerLetters.push(playerLetter)

        letters = letters.filter(
            (letter) =>
                letter.uniqueIdentifier !==
                playerLetter.uniqueIdentifier
        )
    }

    return [letters, playerLetters]
}
