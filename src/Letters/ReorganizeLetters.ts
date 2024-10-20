import { LetterOwner } from '../Definitions'
import { ILetter, ILetters } from './Letters'

// to do: write tests for updateCorrectlySortedLetters
export function updateCorrectlySortedLetters(
    correctlySortedLetters: ILetters,
    prevSortedLetter: ILetter[]
) {
    prevSortedLetter.forEach(letter => {
        switch (letter.location) {
            case LetterOwner.Available:
                correctlySortedLetters.available.push(letter)
                return

            case LetterOwner.Board:
                correctlySortedLetters.board.push(letter)
                return

            case LetterOwner.Computer:
                correctlySortedLetters.computer.push(letter)
                return

            default:
                correctlySortedLetters.person.push(letter)
                return
        }
    })
}

export function reorganizeLetters(allLetters: ILetters) {
    const correctlySortedLetters: ILetters = {
        available: [],
        computer: [],
        person: [],
        board: [],
    }

    const duplicateLetters = { ...allLetters }
    const duplicateAvailable = duplicateLetters.available
    const duplicateComputer = duplicateLetters.computer
    const duplicatePerson = duplicateLetters.person
    const duplicateBoard = duplicateLetters.board

    updateCorrectlySortedLetters(
        correctlySortedLetters,
        duplicateAvailable
    )
    updateCorrectlySortedLetters(
        correctlySortedLetters,
        duplicateComputer
    )
    updateCorrectlySortedLetters(
        correctlySortedLetters,
        duplicatePerson
    )
    updateCorrectlySortedLetters(
        correctlySortedLetters,
        duplicateBoard
    )

    return correctlySortedLetters
}
