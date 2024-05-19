import { createContext, useReducer } from 'react'
import { IState, initialState } from './InitialState'
import { distributeLettersAtGameStart } from '../Utils/GetStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import { UserActions } from '../Definitions'

type ActionType = {
    type: UserActions
    payload?: ILetters | string
}

function reducer(state: IState, action: ActionType): IState {
    switch (action.type) {
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

        default:
            return state
    }
}

export type { ActionType }

const useScrabbleContext = (initialState: IState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state: ', state)

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

    const selectComputerSkillLevel = (computerSkillLevel: string) => {
        dispatch({
            type: UserActions.SelectComputerSkillLevel,
            payload: computerSkillLevel,
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

    return {
        state,
        proceedToOpponentPage,
        selectComputerSkillLevel,
        gameTimeLimit,
        turnTimeLimit,
    }
}

type UseScrabbleContextType = ReturnType<typeof useScrabbleContext>

const initialContextState: UseScrabbleContextType = {
    state: initialState,
    proceedToOpponentPage: () => {},
    selectComputerSkillLevel: () => {},
    gameTimeLimit: () => {},
    turnTimeLimit: () => {},
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
            value={useScrabbleContext(initialState)}
        >
            {children}
        </ScrabbleContext.Provider>
    )
}
