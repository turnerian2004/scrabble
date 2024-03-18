import { GAMETERMS, LETTEROWNER } from '../enums'
import { ILetter } from '../Letters/Letters'

export function distributeLettersAtGameStart(
    letters: ILetter[]
): [
    availableLetters: ILetter[],
    personLetters: ILetter[],
    computerLetters: ILetter[]
] {
    const availableLetters = [...letters]

    const [availableLetters1, computerLetters] = getPlayerLetters(
        availableLetters,
        LETTEROWNER.Computer
    )

    const [availableLetters2, personLetters] = getPlayerLetters(
        availableLetters1,
        LETTEROWNER.Person
    )

    return [availableLetters2, personLetters, computerLetters]
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

function getPlayerLetters(
    availableLetters: ILetter[],
    letterOwner: LETTEROWNER
): [availableLetters: ILetter[], playerLetters: ILetter[]] {
    let letters: ILetter[] = [...availableLetters]
    const playerLetters: ILetter[] = []

    for (let i = 0; i < GAMETERMS.MaxNumberLettersPerPlayer; i++) {
        const letterIndex: number = getRandomInt(letters.length)
        const playerLetter: ILetter = letters[letterIndex]
        playerLetter.owner = letterOwner
        playerLetters.push(playerLetter)

        // remove letters from letter bag that have been assigned
        letters = letters.filter(
            (letter) =>
                letter.uniqueIdentifier !==
                playerLetter.uniqueIdentifier
        )
    }

    return [letters, playerLetters]
}
