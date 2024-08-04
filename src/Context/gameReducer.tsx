import { createContext, useReducer } from 'react'
import { IState, initialState } from './InitialState'
import {
    assignPlayerLetters,
    distributeLettersAtGameStart,
} from '../Helpers/GetStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import {
    ComputerSkillLevel,
    LetterOwner,
    UserActions,
    freeDictionaryApiResponse,
} from '../Definitions'
import { getRecommendedWords } from '../Helpers/GetRecommendedWords'
import { WordEntry, allEnglishWords } from '../assests/words'
import { reorganizeLetters } from '../Letters/ReorganizeLetters'
import { letterDropPayloadProps } from '../Components/GameBoardTile'
import {
    identifyLettersPlacedOnBoard,
    removeUsedLetters,
} from '../Helpers/StartGame'

type ActionType = {
    type: UserActions
    payload?:
        | ILetters
        | string
        | WordEntry[]
        | letterDropPayloadProps
        | freeDictionaryApiResponse
}

function reducer(state: IState, action: ActionType): IState {
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
                computerLettersPlacedOnBoard,
                state.allLetters.computer
            )

            console.log(
                'computerReplacementLetters: ',
                computerReplacementLetters
            )
            console.log(
                'updatedComputerLetters: ',
                updatedComputerLetters
            )

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

            return {
                ...state,
                hasGameStarted: true,
                computerRecommendedWord:
                    computerStartingWordWithPointTotal,
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

export type { ActionType }

const useScrabbleContext = (initialState: IState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state: ', state)

    const startGame = async () => {
        const computerStartingWord: freeDictionaryApiResponse =
            await getRecommendedWords(
                state.allLetters.computer,
                state.computerSkillLevel as ComputerSkillLevel
            )

        const cleanComputerStartingWord = computerStartingWord

        dispatch({
            type: UserActions.StartGame,
            payload: cleanComputerStartingWord,
        })
    }

    const proceedToOpponentPage = () => {
        const [availableLetters, personLetters, computerLetters] =
            distributeLettersAtGameStart(state.allLetters.available)
        const boardLetters: ILetter[] = []
        const updatedLetters: ILetters = {
            available: availableLetters,
            computer: computerLetters,
            person: personLetters,
            board: boardLetters,
        }

        dispatch({
            type: UserActions.ProceedToOpponentSelectPage,
            payload: updatedLetters,
        })
    }

    const selectHintHelpLevel = (levelSupportRequested: string) => {
        dispatch({
            type: UserActions.LevelSupportRequested,
            payload: levelSupportRequested,
        })
    }

    const selectComputerSkillLevel = (computerSkillLevel: string) => {
        dispatch({
            type: UserActions.SelectComputerSkillLevel,
            payload: computerSkillLevel,
        })
    }

    const selectHintType = (hintTypeRequested: string) => {
        dispatch({
            type: UserActions.HintTypeRequested,
            payload: hintTypeRequested,
        })
    }

    const gameTimeLimit = (gameTimeLimit: string) => {
        dispatch({
            type: UserActions.GameTimeLimit,
            payload: gameTimeLimit,
        })
    }

    const turnTimeLimit = (turnTimeLimit: string) => {
        dispatch({
            type: UserActions.TurnTimeLimit,
            payload: turnTimeLimit,
        })
    }

    const moveLetterToBoard = (
        letterDropInfo: letterDropPayloadProps
    ) => {
        dispatch({
            type: UserActions.MoveLetterToBoard,
            payload: letterDropInfo,
        })
    }

    return {
        state,
        proceedToOpponentPage,
        selectComputerSkillLevel,
        gameTimeLimit,
        turnTimeLimit,
        startGame,
        moveLetterToBoard,
        selectHintHelpLevel,
        selectHintType,
    }
}

type UseScrabbleContextType = ReturnType<typeof useScrabbleContext>

const initialContextState: UseScrabbleContextType = {
    state: initialState,
    proceedToOpponentPage: () => {},
    selectComputerSkillLevel: () => {},
    gameTimeLimit: () => {},
    turnTimeLimit: () => {},
    startGame: async () => {},
    moveLetterToBoard: () => {},
    selectHintHelpLevel: () => {},
    selectHintType: () => {},
}

export const ScrabbleContext = createContext<UseScrabbleContextType>(
    initialContextState
)

interface Props {
    children: React.ReactNode
    initialState: IState
}

export const ScrabbleProvider = ({
    children,
    initialState,
}: Props): JSX.Element => {
    return (
        <ScrabbleContext.Provider
            value={useScrabbleContext(initialState)}>
            {children}
        </ScrabbleContext.Provider>
    )
}
