import { LetterNumericValues, LetterOwner } from '../Definitions'
import { ILetter } from '../Letters/Letters'

export function horizontalWordStartingCoordinate(
    computerWordLength: number
) {
    switch (computerWordLength) {
        case 7:
        case 6:
            return LetterNumericValues.E

        case 5:
        case 4:
            return LetterNumericValues.F

        case 3:
        case 2:
            return LetterNumericValues.G

        default:
            return LetterNumericValues.H
    }
}

export function verticalWordStartingCoordinate(
    computerWordLength: number
): number {
    switch (computerWordLength) {
        case 7:
        case 6:
            return 5

        case 5:
        case 4:
            return 6

        case 3:
        case 2:
            return 7

        default:
            return 8
    }
}

export function identifyLettersPlacedOnBoard(
    currentComputerLetters: ILetter[],
    recommendedWord: string
) {
    let updatedComputerLetters: ILetter[] = [
        ...currentComputerLetters,
    ]

    const computerLettersPlacedOnBoard: ILetter[] = []

    for (let i = 0; i < recommendedWord.length; i++) {
        const recommendedLetter = recommendedWord[i]
        const computerLetterPlacedOnBoard =
            updatedComputerLetters.find(
                letter => letter.character === recommendedLetter
            )

        /* istanbul ignore else */
        if (computerLetterPlacedOnBoard) {
            computerLetterPlacedOnBoard.location = LetterOwner.Board
            computerLettersPlacedOnBoard.push(
                computerLetterPlacedOnBoard
            )
            const letterUniqueIdentifier =
                computerLetterPlacedOnBoard.uniqueIdentifier

            updatedComputerLetters = updatedComputerLetters.filter(
                function (letter) {
                    return (
                        letter.uniqueIdentifier !=
                        letterUniqueIdentifier
                    )
                }
            )
        }
    }

    return computerLettersPlacedOnBoard
}

export function removeUsedLetters(
    letterBag: ILetter[],
    usedLetters: ILetter[]
): ILetter[] {
    const updatedLetterBag: ILetter[] = letterBag.filter(
        letter =>
            !usedLetters.some(
                usedLetters =>
                    usedLetters.uniqueIdentifier ===
                    letter.uniqueIdentifier
            )
    )

    return updatedLetterBag
}
