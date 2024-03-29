import { LETTEROWNER } from '../Definitions'
import { getPlayerLetters, getRandomInt } from './getStartingLetters'
import { mockLetterTestData } from './mockLetterTestData'

describe('getRandomInt function', () => {
    test('should return a random integer less than the given maximum value', () => {
        const max = 10
        const result = getRandomInt(max)
        expect(result).toBeLessThan(max)
    })

    test('should return a random integer greater than or equal to zero', () => {
        const result = getRandomInt(10)
        expect(result).toBeGreaterThanOrEqual(0)
    })

    test('should return an integer value', () => {
        const result = getRandomInt(10)
        expect(Number.isInteger(result)).toBe(true)
    })
})

describe('getPlayerLetters function', () => {
    test('should assign letters given to players', () => {
        const [availableLetters1, computerLetters] = getPlayerLetters(
            mockLetterTestData,
            LETTEROWNER.Computer
        )

        const [availableLetters2, personLetters] = getPlayerLetters(
            availableLetters1,
            LETTEROWNER.Person
        )

        expect(availableLetters1.length).toEqual(93)
        expect(availableLetters2.length).toEqual(86)
        expect(computerLetters.length).toEqual(7)
        expect(personLetters.length).toEqual(7)

        for (let i = 0; i < computerLetters.length; i++) {
            const availableLetter = computerLetters[i]
            expect(availableLetter.owner).toEqual(
                LETTEROWNER.Computer
            )
        }

        for (let i = 0; i < personLetters.length; i++) {
            const availableLetter = personLetters[i]
            expect(availableLetter.owner).toEqual(LETTEROWNER.Person)
        }

        for (let i = 0; i < personLetters.length; i++) {
            const availableLetter = personLetters[i]
            expect(availableLetter.owner).toEqual(LETTEROWNER.Person)
        }

        // console.log('availableLetters1')
        // console.log(availableLetters1)
        // console.log('availableLetters2')
        // console.log(availableLetters2)
        // console.log('computerLetters')
        // console.log(computerLetters)
        // console.log('personLetters')
        // console.log(personLetters)
    })
})
