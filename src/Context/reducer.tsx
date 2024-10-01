import { allEnglishWords, WordEntry } from '../assests/words'
import { letterDropPayloadProps } from '../Components/GameBoardTile'
import {
    freeDictionaryApiResponse,
    LetterOwner,
    UserActions,
} from '../Definitions'
import { assignPlayerLetters } from '../Helpers/GetStartingLetters'
import { updateBoard } from '../Helpers/InitializeBoard'
import {
    identifyLettersPlacedOnBoard,
    removeUsedLetters,
} from '../Helpers/StartGame'
import { ILetter, ILetters } from '../Letters/Letters'
import { reorganizeLetters } from '../Letters/ReorganizeLetters'
import { IState } from './InitialState'

type ActionType = {
    type: UserActions
    payload?:
        | ILetters
        | string
        | WordEntry[]
        | letterDropPayloadProps
        | freeDictionaryApiResponse
}

export function reducer(state: IState, action: ActionType): IState {
    switch (action.type) {
        case UserActions.StartGame: {
            const computerStartingWordApiResponse =
                action.payload as freeDictionaryApiResponse
            const recommendedWord =
                computerStartingWordApiResponse.word
            const recommendedWordFirstLetter = recommendedWord[0]
            const words =
                allEnglishWords[recommendedWordFirstLetter][
                    recommendedWord.length
                ]
            const computerStartingWordWithPointTotal = words.find(
                word => word.word === recommendedWord
            )!

            const computerLettersPlacedOnBoard =
                identifyLettersPlacedOnBoard(
                    state.allLetters.computer,
                    recommendedWord
                )

            const currentAvailableLetters = state.allLetters.available

            const updatedAvailableLetterBag = removeUsedLetters(
                currentAvailableLetters,
                computerLettersPlacedOnBoard
            )

            const [, computerReplacementLetters] =
                assignPlayerLetters(
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

            // To do:
            // 1. check all letters in updatedLetterBag are not in computerLettersPlacedOnBoard
            // 2. assign x # new letters to computer -> compensates for letters placed on board
            // 3. update allLetters in return statement -> only person's letters will not be changed
            // 4. update board
            // 5. write tests

            // how to update the board
            // const newBoardLetters = state.allLetters.computer
            // newBoardLetters[0].location = LetterOwner.Board
            // newBoardLetters[0].xCoordinate = 2
            // newBoardLetters[0].yCoordinate = 2
            // newBoardLetters[1].location = LetterOwner.Board
            // newBoardLetters[1].xCoordinate = 3
            // newBoardLetters[1].yCoordinate = 3
            // newBoardLetters[1].character = 'b7'
            // const newLetters = state.allLetters
            // newLetters.board = newBoardLetters
            // const newBoard = updateBoard(newBoardLetters)

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

            console.log('newLetterBag.board: ', newLetterBag.board)

            return {
                ...state,
                hasGameStarted: true,
                computerRecommendedWord:
                    computerStartingWordWithPointTotal,
                allLetters: newLetterBag,
                board: newBoard,
            }
        }

        case UserActions.ProceedToOpponentSelectPage: {
            const assignLettersOwners = action.payload as ILetters

            return {
                ...state,
                proceedToOpponentSelectPage: true,
                allLetters: assignLettersOwners,
            }
        }

        case UserActions.SelectComputerSkillLevel: {
            const computerSkillLevel = action.payload as string

            return {
                ...state,
                computerSkillLevel: computerSkillLevel,
            }
        }

        case UserActions.HintTypeRequested: {
            const hintTypeRequested = action.payload as string

            return {
                ...state,
                personsRequestedHintType: hintTypeRequested,
            }
        }

        case UserActions.LevelSupportRequested: {
            const levelSupportRequested = action.payload as string

            return {
                ...state,
                personsRequestedLevelOfSupport: levelSupportRequested,
            }
        }

        case UserActions.GameTimeLimit: {
            const gameTimeLimit = action.payload as string

            return {
                ...state,
                gameTimeLimit: gameTimeLimit,
            }
        }

        case UserActions.TurnTimeLimit: {
            const turnTimeLimit = action.payload as string

            return {
                ...state,
                turnTimeLimit: turnTimeLimit,
            }
        }

        case UserActions.MoveLetterToBoard: {
            const letterDropInfo: letterDropPayloadProps =
                action.payload as letterDropPayloadProps

            const personLetters = state.allLetters.person

            const droppedLetter = personLetters.find(
                letter =>
                    letter.uniqueIdentifier ===
                    letterDropInfo.uniqueIdentifier
            )

            if (droppedLetter) {
                droppedLetter.location = LetterOwner.Board
                droppedLetter.xCoordinate = letterDropInfo.xCoordinate
                droppedLetter.yCoordinate = letterDropInfo.yCoordinate
            }

            const updatedAllLetters = reorganizeLetters(
                state.allLetters
            )

            return { ...state, allLetters: updatedAllLetters }
        }

        default:
            return state
    }
}
