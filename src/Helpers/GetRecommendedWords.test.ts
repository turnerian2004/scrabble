import { WordEntry } from '../assests/words'
import { ComputerSkillLevel } from '../Definitions'
import { wordLetterPermutations } from './fixtures'
import {
    cleanWordList,
    getAllPossibleLetterCombinations,
    mediumSkilllLevel,
    sortWordListByDesiredPointValue,
} from './GetRecommendedWords'

describe('letter permutations', () => {
    test('get all possible letter combinations', () => {
        const permutations = getAllPossibleLetterCombinations([
            'c',
            'u',
            'e',
        ])

        expect(wordLetterPermutations).toEqual(permutations)
    })
})

describe('medium skill level', () => {
    test('get words with even number input', () => {
        const validWords = [
            { pointValue: 3, word: 'ate' },
            { pointValue: 8, word: 'plants' },
            { pointValue: 9, word: 'oyster' },
            { pointValue: 14, word: 'scrabble' },
            {
                pointValue: 16,
                word: 'youthtide',
            },
            { pointValue: 18, word: 'zach' },
            {
                pointValue: 22,
                word: 'yellowbelly',
            },
        ]

        const sortedValidWords: WordEntry[] = [
            { pointValue: 14, word: 'scrabble' },
            { pointValue: 9, word: 'oyster' },
            {
                pointValue: 16,
                word: 'youthtide',
            },
            { pointValue: 8, word: 'plants' },
            { pointValue: 18, word: 'zach' },
            { pointValue: 3, word: 'ate' },
            {
                pointValue: 22,
                word: 'yellowbelly',
            },
        ]

        const sortedWordList = mediumSkilllLevel(validWords)

        expect(sortedWordList).toEqual(sortedValidWords)
    })

    test('get medium skill level words with odd number input', () => {
        const validWords = [
            { pointValue: 5, word: 'cur' },
            { pointValue: 8, word: 'smells' },
            { pointValue: 9, word: 'desk' },
            { pointValue: 13, word: 'offing' },
            { pointValue: 15, word: 'smeeky' },
            { pointValue: 16, word: 'explain' },
            { pointValue: 17, word: 'offpay' },
        ]

        const sortedValidWords: WordEntry[] = [
            { pointValue: 13, word: 'offing' },
            { pointValue: 9, word: 'desk' },
            { pointValue: 15, word: 'smeeky' },
            { pointValue: 8, word: 'smells' },
            { pointValue: 16, word: 'explain' },
            { pointValue: 5, word: 'cur' },
            { pointValue: 17, word: 'offpay' },
        ]

        const sortedWordList = mediumSkilllLevel(validWords)

        expect(sortedWordList).toEqual(sortedValidWords)
    })
})

describe('clean word list function', () => {
    test('identify the letter combination lkhjd as an invalid word', () => {
        const validWords: WordEntry[] = [
            { pointValue: 5, word: 'dog' },
            { pointValue: 3, word: 'eat' },
        ]

        const cleanedWordList = cleanWordList(['dog', 'eat', 'lkhjd'])

        expect(cleanedWordList).toEqual(validWords)
    })
})

describe('clean word list function', () => {
    test('identify the letter combination lkhjd as an invalid word', () => {
        const validWords: WordEntry[] = [
            { pointValue: 5, word: 'dog' },
            { pointValue: 3, word: 'eat' },
        ]

        const cleanedWordList = cleanWordList(['dog', 'eat', 'lkhjd'])

        expect(cleanedWordList).toEqual(validWords)
    })
})

describe('sort words by point value', () => {
    const sortedWords = [
        { pointValue: 5, word: 'cur' },
        { pointValue: 8, word: 'smells' },
        { pointValue: 9, word: 'desk' },
        { pointValue: 13, word: 'offing' },
        { pointValue: 15, word: 'smeeky' },
        { pointValue: 16, word: 'explain' },
        { pointValue: 17, word: 'offpay' },
    ]

    const hardestWords = [
        { pointValue: 17, word: 'offpay' },
        { pointValue: 16, word: 'explain' },
        { pointValue: 15, word: 'smeeky' },
        { pointValue: 13, word: 'offing' },
        { pointValue: 9, word: 'desk' },
        { pointValue: 8, word: 'smells' },
        { pointValue: 5, word: 'cur' },
    ]

    const mediumWords = [
        { pointValue: 13, word: 'offing' },
        { pointValue: 9, word: 'desk' },
        { pointValue: 15, word: 'smeeky' },
        { pointValue: 8, word: 'smells' },
        { pointValue: 16, word: 'explain' },
        { pointValue: 5, word: 'cur' },
        { pointValue: 17, word: 'offpay' },
    ]

    test('return the easiest words first', () => {
        const easiestWordsFirst = sortWordListByDesiredPointValue(
            sortedWords,
            ComputerSkillLevel.Easy
        )

        expect(easiestWordsFirst).toEqual(sortedWords)
    })

    test('return the hardest words first', () => {
        const hardestWordsFirst = sortWordListByDesiredPointValue(
            sortedWords,
            ComputerSkillLevel.Sensei
        )

        expect(hardestWords).toEqual(hardestWordsFirst)
    })

    test('return the medium ranked words first', () => {
        const mediumWordsFirst = sortWordListByDesiredPointValue(
            sortedWords,
            ComputerSkillLevel.Medium
        )

        expect(mediumWordsFirst).toEqual(mediumWords)
    })
})
