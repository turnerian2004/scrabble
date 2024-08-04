import { LetterOwner } from '../Definitions'
import { initialAvailableLetters } from './fixtures'
import {
    assignPlayerLetters,
    distributeLettersAtGameStart,
    getRandomInt,
} from './GetStartingLetters'

describe('assign player letters', () => {
    test('ensure players get correct letters', () => {
        const startingNumLetters = 3
        const [availableLetters1, computerStartingLetters] =
            assignPlayerLetters(
                initialAvailableLetters,
                LetterOwner.Computer,
                startingNumLetters
            )

        const [availableLetters2, personStartingLetters] =
            assignPlayerLetters(
                availableLetters1,
                LetterOwner.Computer,
                startingNumLetters
            )

        const computerStartingLettersUniqueIdentifiers =
            availableLetters2.map(letter => letter.uniqueIdentifier)

        const letterMatchesAcrossBothPlayers =
            personStartingLetters.filter(letter =>
                computerStartingLettersUniqueIdentifiers.includes(
                    letter.uniqueIdentifier
                )
            )

        expect(letterMatchesAcrossBothPlayers.length).toEqual(0)
        expect(computerStartingLetters.length).toEqual(3)
        expect(personStartingLetters.length).toEqual(3)
        expect(availableLetters2.length).toEqual(10)
    })
})

describe('random int', () => {
    test("assign letters at game's start", () => {
        const initialNumStartingLetters = 7
        const remainingAvailableLetters = 2

        const [availableLetters, personLetters, computerLetters] =
            distributeLettersAtGameStart(initialAvailableLetters)

        const computerStartingLettersUniqueIdentifiers =
            computerLetters.map(letter => letter.uniqueIdentifier)

        const letterMatchesAcrossBothPlayers = personLetters.filter(
            letter =>
                computerStartingLettersUniqueIdentifiers.includes(
                    letter.uniqueIdentifier
                )
        )

        expect(letterMatchesAcrossBothPlayers.length).toEqual(0)

        expect(personLetters.length).toEqual(
            initialNumStartingLetters
        )
        expect(computerLetters.length).toEqual(
            initialNumStartingLetters
        )
        expect(availableLetters.length).toEqual(
            remainingAvailableLetters
        )
    })
})

describe('random int', () => {
    test('ensure generated int is less than max', () => {
        const max = 10
        const randomInt = getRandomInt(max)

        expect(randomInt).toBeLessThanOrEqual(max)
    })
})
