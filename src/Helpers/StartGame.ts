import { LetterNumericValues, LetterOwner } from '../Definitions'
import { ILetter } from '../Letters/Letters'

export function horizontalWordStartingCoordinate(
    computerWordLength: number
) {
    switch (computerWordLength) {
        case 6 || 7:
            return LetterNumericValues.E

        case 4 || 5:
            return LetterNumericValues.F

        case 2 || 3:
            return LetterNumericValues.G

        default:
            LetterNumericValues.H
    }
}

export function verticalWordStartingCoordinate(
    computerWordLength: number
): number {
    switch (computerWordLength) {
        case 6 || 7:
            return 5

        case 4 || 5:
            return 6

        case 2 || 3:
            return 7

        default:
            return 8
    }
}

export function identifyLettersPlacedOnBoard(
    currentComputerLetters: ILetter[],
    recommendedWord: string
) {
    const isWordVerticallyPlaceOnBoard =
        Math.floor(Math.random() * 2) % 2

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
    currentLetterBag: ILetter[],
    computerLettersPlacedOnBoard: ILetter[]
): ILetter[] {
    const updatedLetterBag: ILetter[] = currentLetterBag.filter(
        function (letterBagLetter) {
            return !computerLettersPlacedOnBoard.find(
                function (computerLetterPlacedOnBoard) {
                    return (
                        letterBagLetter.uniqueIdentifier ===
                        computerLetterPlacedOnBoard.uniqueIdentifier
                    )
                }
            )
        }
    )

    return updatedLetterBag
}
