import { ComputerSkillLevel } from '../Definitions'
import { ILetter } from '../Letters/Letters'
import { WordEntry, allEnglishWords } from '../assests/words'
import axios from 'axios'

export async function getRecommendedWords(
    letters: ILetter[],
    computerSkillLevel: ComputerSkillLevel
) {
    const playerLetters: ILetter[] = [...letters]

    const letterCharacters = playerLetters.map(
        computerLetter => computerLetter.character
    )

    const allLetterCombinations =
        getAllPossibleLetterCombinations(letterCharacters)

    const allWordCombinations = cleanWordList(allLetterCombinations)

    allWordCombinations.sort((a, b) => a.pointValue - b.pointValue)

    const sortedBySkillLevelWords = sortWordListByDesiredPointValue(
        allWordCombinations,
        computerSkillLevel as ComputerSkillLevel
    )

    const wordDefinition = getWordDefinition(sortedBySkillLevelWords)

    return wordDefinition
}

async function getWordDefinition(
    sortedBySkillLevelWords: WordEntry[]
) {
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

export function sortWordListByDesiredPointValue(
    wordList: WordEntry[],
    computerSkillLevel: ComputerSkillLevel
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

export function mediumSkilllLevel(arr: WordEntry[]): WordEntry[] {
    const temp = [...arr]
    const result: WordEntry[] = []

    while (temp.length > 0) {
        const midPoint =
            temp.length % 2 === 0
                ? Math.floor(temp.length / 2) - 1
                : Math.floor(temp.length / 2)
        const value = temp[midPoint]

        result.push(value)
        temp.splice(midPoint, 1)
    }

    return result
}

export function cleanWordList(
    allLetterCombinations: string[]
): WordEntry[] {
    // remove all letter combinations that are not valid words
    const allValidWords: WordEntry[] = []

    allLetterCombinations.forEach(letterCombination => {
        const firstLetter = letterCombination[0]

        /* istanbul ignore else*/
        if (
            allEnglishWords[firstLetter] !== undefined ||
            allEnglishWords[firstLetter][letterCombination.length] !==
                undefined
        ) {
            // all words with the 1st letter & length of the letter combination
            const words =
                allEnglishWords[firstLetter][letterCombination.length]

            const matchingWord = words.find(
                word => word.word === letterCombination
            )

            if (matchingWord && matchingWord.word.length > 1) {
                allValidWords.push(matchingWord)
            }
        }
    })

    return allValidWords
}

export function getAllPossibleLetterCombinations(
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
