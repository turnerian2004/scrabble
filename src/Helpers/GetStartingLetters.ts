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

    const [availableLetters1, computerLetters] = assignPlayerLetters(
        availableLetters,
        LetterOwner.Computer,
        GameTerms.MaxNumberLettersPerPlayer
    )

    const [availableLetters2, personLetters] = assignPlayerLetters(
        availableLetters1,
        LetterOwner.Person,
        GameTerms.MaxNumberLettersPerPlayer
    )

    return [availableLetters2, personLetters, computerLetters]
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function assignPlayerLetters(
    availableLetters: ILetter[],
    letterOwner: LetterOwner,
    numLettersToAssign: number
): [availableLetters: ILetter[], playerLetters: ILetter[]] {
    // assigns players their letters after they have placed letters on the board
    let letters: ILetter[] = [...availableLetters]
    const playerLetters: ILetter[] = []

    for (
        let i = 0;
        i < numLettersToAssign && availableLetters.length > 0;
        i++
    ) {
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
