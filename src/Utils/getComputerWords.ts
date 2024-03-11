import { ILetter } from '../Letters/Letters'
import { allEnglishWords } from '../assests/words'

export function getComputerStartingWord(letters: ILetter[]) {
    const computerLetters: ILetter[] = [...letters]

    const computerCharacters = computerLetters.map(
        (computerLetter) => computerLetter.character
    )

    const computerAllLetterCombinations =
        getAllPossibleLetterCombinations(computerCharacters)

    const computerAllWordCombinations = cleanWordList(
        computerAllLetterCombinations
    )
}

function cleanWordList(allLetterCombinations: string[]): string[] {
    const allValidLetterCombinations: string[] = []

    allLetterCombinations.forEach((letterCombination) => {
        const firstLetter = letterCombination[0]

        if (
            allEnglishWords[firstLetter] !== undefined ||
            allEnglishWords[firstLetter][letterCombination.length] !==
                undefined
        ) {
            const words =
                allEnglishWords[firstLetter][letterCombination.length]

            if (words.some((word) => word.word === letterCombination))
                allValidLetterCombinations.push(letterCombination)
        }
    })

    return allValidLetterCombinations
}

function getAllPossibleLetterCombinations(
    letters: string[]
): string[] {
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

    return result
}
