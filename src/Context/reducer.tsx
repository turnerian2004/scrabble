import { WordEntry } from '../assests/words'
import { letterDropPayloadProps } from '../Components/GameBoardTile'
import {
    freeDictionaryApiResponse,
    LetterOwner,
    UserActions,
} from '../Definitions'
import { ILetters } from '../Letters/Letters'
import { reorganizeLetters } from '../Letters/ReorganizeLetters'
import { IState } from './InitialState'
import { handleStartGame } from './reducer-helper'

export type ActionType = {
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
            const {
                newBoard,
                computerStartingWordWithPointTotal,
                newLetterBag,
            } = handleStartGame(state, action)

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
