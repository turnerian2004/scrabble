import {
    initialPlayersLetters,
    recommendedWordLetters,
    updatedLetterBag,
    lettersPlacedOnBoard,
} from './fixtures'
import {
    horizontalWordStartingCoordinate,
    identifyLettersPlacedOnBoard,
    removeUsedLetters,
    verticalWordStartingCoordinate,
} from './StartGame'

test('remove used letters from letter bag', () => {
    const result = removeUsedLetters(
        initialPlayersLetters,
        lettersPlacedOnBoard
    )
    expect(result).toEqual(updatedLetterBag)
})

test('identify letters placed on board', () => {
    const result = identifyLettersPlacedOnBoard(
        initialPlayersLetters,
        'sewers'
    )

    expect(result).toEqual(recommendedWordLetters)
})

describe('identify starting coordinate for word', () => {
    it('should return 8 for input 8', () => {
        const answer = verticalWordStartingCoordinate(8)
        expect(answer).toEqual(8)
    })

    it('should return 5 for input 7', () => {
        const answer = verticalWordStartingCoordinate(7)
        expect(answer).toEqual(5)
    })

    it('should return 5 for input 6', () => {
        const answer = verticalWordStartingCoordinate(6)
        expect(answer).toEqual(5)
    })

    it('should return 6 for input 5', () => {
        const answer = verticalWordStartingCoordinate(5)
        expect(answer).toEqual(6)
    })

    it('should return 6 for input 4', () => {
        const answer = verticalWordStartingCoordinate(4)
        expect(answer).toEqual(6)
    })

    it('should return 7 for input 3', () => {
        const answer = verticalWordStartingCoordinate(3)
        expect(answer).toEqual(7)
    })

    it('should return 7 for input 2', () => {
        const answer = verticalWordStartingCoordinate(2)
        expect(answer).toEqual(7)
    })
})

describe('identify starting coordinate for word', () => {
    it('should return 5 for input 7', () => {
        const answer = horizontalWordStartingCoordinate(7)
        expect(answer).toEqual(5)
    })

    it('should return 5 for input 6', () => {
        const answer = horizontalWordStartingCoordinate(6)
        expect(answer).toEqual(5)
    })

    it('should return 6 for input 5', () => {
        const answer = horizontalWordStartingCoordinate(5)
        expect(answer).toEqual(6)
    })

    it('should return 6 for input 4', () => {
        const answer = horizontalWordStartingCoordinate(4)
        expect(answer).toEqual(6)
    })

    it('should return 7 for input 3', () => {
        const answer = horizontalWordStartingCoordinate(3)
        expect(answer).toEqual(7)
    })

    it('should return 7 for input 2', () => {
        const answer = horizontalWordStartingCoordinate(2)
        expect(answer).toEqual(7)
    })

    it('should return 8 for input 8', () => {
        const answer = horizontalWordStartingCoordinate(8)
        expect(answer).toEqual(8)
    })
})
