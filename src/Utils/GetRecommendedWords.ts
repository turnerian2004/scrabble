import { ComputerSkillLevel } from '../Definitions'
import { ILetter } from '../Letters/Letters'
import { WordEntry, allEnglishWords } from '../assests/words'
import axios from 'axios'

export function getRecommendedWords(
    letters: ILetter[],
    computerSkillLevel: string
) {
    const playerLetters: ILetter[] = [...letters]

    const letterCharacters = playerLetters.map(
        (computerLetter) => computerLetter.character
    )

    const allLetterCombinations =
        getAllPossibleLetterCombinations(letterCharacters)

    const allWordCombinations = cleanWordList(allLetterCombinations)

    allWordCombinations.sort((a, b) => a.pointValue - b.pointValue)

    const sortedBySkillLevelWords = sortWordListByDesiredPointValue(
        allWordCombinations,
        computerSkillLevel
    )

    const wordDefinition = getWordDefition(sortedBySkillLevelWords)
    console.log(wordDefinition)

    return sortedBySkillLevelWords
}

async function getWordDefition(sortedBySkillLevelWords: WordEntry[]) {
    let isValidWord = false

    for (
        let i = 0;
        i < sortedBySkillLevelWords.length && isValidWord === false;
        i++
    ) {
        const topWordRecommendation = sortedBySkillLevelWords[i]

        try {
            const response = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${topWordRecommendation.word}`
            )

            const wordDefinition = response.data[0]
            isValidWord = true
            return wordDefinition
        } catch (error) {
            console.log(error)
        }
    }
}

function sortWordListByDesiredPointValue(
    wordList: WordEntry[],
    computerSkillLevel: string
): WordEntry[] {
    switch (computerSkillLevel) {
        case ComputerSkillLevel.Easy: {
            // words are sorted already from lowest point total to highest
            const easySkillWordList = [...wordList]
            return easySkillWordList
        }

        case ComputerSkillLevel.Sensei: {
            // words are sorted from highest point total to lowest
            const senseiWordList = [...wordList].reverse()
            return senseiWordList
        }

        default: {
            const mediumWordList = mediumSkilllLevel(wordList)
            return mediumWordList
        }
    }
}

function mediumSkilllLevel(arr: WordEntry[]) {
    // sample input: [a, b, c, d, e, f, g]
    // sample output: [d, e, c, f, b, g, a]
    // the words with points in the middle are returned at the front of the array
    const midPoint: number = Math.round(arr.length / 2)
    let firstHalfCounter = midPoint - 1
    let secondHalfCounter = midPoint
    const newArray: WordEntry[] = []

    for (let i = 0; i < midPoint; i++) {
        if (firstHalfCounter >= 0 && firstHalfCounter < arr.length) {
            const word1: WordEntry = arr[firstHalfCounter]
            newArray.push(word1)
        }
        if (
            secondHalfCounter >= 0 &&
            secondHalfCounter < arr.length
        ) {
            const word2: WordEntry = arr[secondHalfCounter]
            newArray.push(word2)
        }

        firstHalfCounter--
        secondHalfCounter++
    }

    return newArray
}

function cleanWordList(allLetterCombinations: string[]): WordEntry[] {
    // remove all letter combinations that are not valid words
    const allValidWords: WordEntry[] = []

    allLetterCombinations.forEach((letterCombination) => {
        const firstLetter = letterCombination[0]

        if (
            allEnglishWords[firstLetter] !== undefined ||
            allEnglishWords[firstLetter][letterCombination.length] !==
                undefined
        ) {
            // all words with the 1st letter & length of the letter combination
            const words =
                allEnglishWords[firstLetter][letterCombination.length]

            const matchingWord = words.find(
                (word) => word.word === letterCombination
            )

            if (matchingWord && matchingWord.word.length > 1) {
                allValidWords.push(matchingWord)
            }
        }
    })

    return allValidWords
}

function getAllPossibleLetterCombinations(
    letters: string[]
): string[] {
    // generate all letter combinations from player's letter set
    const result: string[] = []

    const permute = (current: string, remaining: string[]) => {
        if (current.length > 0) {
            result.push(current)
        }

        for (let i = 0; i < remaining.length; i++) {
            permute(
                current + remaining[i],
                remaining.slice(0, i).concat(remaining.slice(i + 1))
            )
        }
    }

    permute('', letters)

    const removeDuplicates = [...new Set(result)]

    return removeDuplicates
}
