import { createContext } from 'react'
import { useScrabbleContext } from './action'
import { initialState, IState } from './InitialState'

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
