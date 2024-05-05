import { createContext, useReducer } from 'react'
import { IState, initialState } from './initialState'
import { distributeLettersAtGameStart } from '../Utils/getStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import { UserActions } from '../Definitions'

type ActionType = {
    type: UserActions
    payload?: ILetters
}

function reducer(state: IState, action: ActionType): IState {
    switch (action.type) {
        case UserActions.STARTGAME: {
            const payload = action.payload as ILetters

            return {
                ...state,
                hasGameStarted: true,
                allLetters: payload,
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

    const startGame = () => {
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
            type: UserActions.STARTGAME,
            payload: updatedLetters,
        })
    }

    return { state, startGame }
}

type UseScrabbleContextType = ReturnType<typeof useScrabbleContext>

const initialContextState: UseScrabbleContextType = {
    state: initialState,
    startGame: () => {},
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
