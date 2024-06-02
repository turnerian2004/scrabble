import { GameTerms, LetterOwner } from '../Definitions'
import { ILetter } from '../Letters/Letters'

export function distributeLettersAtGameStart(
    letters: ILetter[]
): [
    availableLetters: ILetter[],
    personLetters: ILetter[],
    computerLetters: ILetter[],
] {
    const availableLetters = [...letters]

    const [availableLetters1, computerLetters] = getPlayerLetters(
        availableLetters,
        LetterOwner.Computer
    )

    const [availableLetters2, personLetters] = getPlayerLetters(
        availableLetters1,
        LetterOwner.Person
    )

    return [availableLetters2, personLetters, computerLetters]
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function getPlayerLetters(
    availableLetters: ILetter[],
    letterOwner: LetterOwner
): [availableLetters: ILetter[], playerLetters: ILetter[]] {
    // assigns players their letters after they have placed letters on the board
    let letters: ILetter[] = [...availableLetters]
    const playerLetters: ILetter[] = []

    for (let i = 0; i < GameTerms.MaxNumberLettersPerPlayer; i++) {
        const letterIndex: number = getRandomInt(letters.length)
        const playerLetter: ILetter = { ...letters[letterIndex] }
        playerLetter.location = letterOwner
        playerLetters.push(playerLetter)

        // remove letters from letter bag that have been assigned
        letters = letters.filter(
            letter =>
                letter.uniqueIdentifier !==
                playerLetter.uniqueIdentifier
        )
    }

    return [letters, playerLetters]
}
