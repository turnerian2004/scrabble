import { allEnglishWords } from '../assests/words'
import {
    freeDictionaryApiResponse,
    LetterOwner,
} from '../Definitions'
import { assignPlayerLetters } from '../Helpers/GetStartingLetters'
import { updateBoard } from '../Helpers/InitializeBoard'
import {
    identifyLettersPlacedOnBoard,
    removeUsedLetters,
} from '../Helpers/StartGame'
import { ILetter, ILetters } from '../Letters/Letters'
import { IState } from './InitialState'
import { ActionType } from './reducer'

export const handleStartGame = (
    state: IState,
    action: ActionType
) => {
    const computerStartingWordApiResponse =
        action.payload as freeDictionaryApiResponse
    const recommendedWord = computerStartingWordApiResponse.word
    const recommendedWordFirstLetter = recommendedWord[0]
    const words =
        allEnglishWords[recommendedWordFirstLetter][
            recommendedWord.length
        ]
    const computerStartingWordWithPointTotal = words.find(
        word => word.word === recommendedWord
    )!

    const computerLettersPlacedOnBoard = identifyLettersPlacedOnBoard(
        state.allLetters.computer,
        recommendedWord
    )

    const currentAvailableLetters = state.allLetters.available

    const updatedAvailableLetterBag = removeUsedLetters(
        currentAvailableLetters,
        computerLettersPlacedOnBoard
    )

    const [, computerReplacementLetters] = assignPlayerLetters(
        updatedAvailableLetterBag,
        LetterOwner.Person,
        recommendedWord.length
    )

    const updatedComputerLetters = removeUsedLetters(
        state.allLetters.computer,
        computerLettersPlacedOnBoard
    )

    const finalComputerLetters = [
        ...updatedComputerLetters,
        ...computerReplacementLetters,
    ]

    const newLetterBag: ILetters = {
        board: computerLettersPlacedOnBoard,
        person: state.allLetters.person,
        computer: finalComputerLetters,
        available: updatedAvailableLetterBag,
    }

    const testLetterBag: ILetter[] = []
    for (let i = 0; i < newLetterBag.board.length; i++) {
        const letter = newLetterBag.board[i]
        letter.xCoordinate = i
        letter.yCoordinate = i
        testLetterBag.push(letter)
    }

    const newBoard = updateBoard(testLetterBag)

    return {
        newBoard,
        computerStartingWordWithPointTotal,
        newLetterBag,
    }
}
