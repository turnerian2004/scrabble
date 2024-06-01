import { createContext, useReducer } from 'react'
import { IState, initialState } from './InitialState'
import { distributeLettersAtGameStart } from '../Utils/GetStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import { LetterOwner, UserActions } from '../Definitions'
import { getRecommendedWords } from '../Utils/GetRecommendedWords'
import { WordEntry } from '../assests/words'
import { reorganizeLetters } from '../Letters/ReorganizeLetters'
import { letterDropPayloadProps } from '../Components/GameBoardTile'

type ActionType = {
    type: UserActions
    payload?: ILetters | string | WordEntry[] | letterDropPayloadProps
}

function reducer(state: IState, action: ActionType): IState {
    switch (action.type) {
        case UserActions.StartGame: {
            const wordEntries = action.payload as WordEntry[]
            console.log('wordEntries: ', wordEntries)

            return { ...state }
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

    const startGame = () => {
        const computerWords = getRecommendedWords(
            state.allLetters.computer,
            state.computerSkillLevel as string
        )

        dispatch({
            type: UserActions.StartGame,
            payload: computerWords,
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
    startGame: () => {},
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
