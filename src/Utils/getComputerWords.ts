import { ILetter } from '../Letters/Letters'
import { WordEntry, allEnglishWords } from '../assests/words'

export function getComputerStartingWord(
    letters: ILetter[]
    // computerSkillLevel
) {
    const computerLetters: ILetter[] = [...letters]

    console.log('computerLetters: ', computerLetters)

    const computerCharacters = computerLetters.map(
        (computerLetter) => computerLetter.character
    )

    const computerAllLetterCombinations =
        getAllPossibleLetterCombinations(computerCharacters)

    console.log(
        'computerAllLetterCombinations: ',
        computerAllLetterCombinations
    )

    const computerAllWordCombinations = cleanWordList(
        computerAllLetterCombinations
    )

    console.log(
        'computerAllWordCombinations: ',
        computerAllWordCombinations
    )

    computerAllWordCombinations.sort(
        (a, b) => a.pointValue - b.pointValue
    )
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

            if (matchingWord) {
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
