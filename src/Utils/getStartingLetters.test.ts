import { getRandomInt } from './getStartingLetters'

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
