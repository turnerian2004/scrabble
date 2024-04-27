import { createContext, useCallback, useReducer } from 'react'
import { IState, initialState } from './initialState'
import { IOpponentDispatch } from '../SelectMenu/OpponentSkillLevelSelect'
import { IBasicDispatch } from '../SelectMenu/BasicSelect'
import { distributeLettersAtGameStart } from '../Utils/getStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import { UserActions } from '../Definitions'
import { IStartAction } from '../StartButton/StartButton'

function reducer(
    state: IState,
    action: IStartAction | IOpponentDispatch | IBasicDispatch
): IState {
    switch (action.type) {
        case UserActions.STARTGAME: {
            const [availableLetters, personLetters, computerLetters] =
                distributeLettersAtGameStart(
                    state.allLetters.available
                )
            const boardLetters: ILetter[] = []
            const updatedLetters: ILetters = {
                available: availableLetters,
                computer: computerLetters,
                person: personLetters,
                board: boardLetters,
            }

            return {
                ...state,
                hasGameStarted: true,
                allLetters: updatedLetters,
            }
        }

        case UserActions.SELECTCOMPUTERSKILLLEVEL: {
            const bestRecommendedWord = (action as IOpponentDispatch)
                .payload[0]

            const recommendedWords = (action as IOpponentDispatch)
                .payload[1]

            const computerSkillLevel = (action as IOpponentDispatch)
                .payload[2]

            return {
                ...state,
                bestRecommendedWord: bestRecommendedWord,
                recommendedWords: recommendedWords,
                computerSkillLevel: computerSkillLevel,
            }
        }

        case UserActions.LEVELSUPPORTREQUESTED: {
            const personsRequestedLevelOfSupport =
                action.payload as string

            return {
                ...state,
                personsRequestedLevelOfSupport:
                    personsRequestedLevelOfSupport,
            }
        }

        case UserActions.HINTTYPEREQUESTED: {
            const personsRequestedHintType = action.payload as string

            return {
                ...state,
                personsRequestedHintType: personsRequestedHintType,
            }
        }

        default:
            return state
    }
}

const useScrabbleContext = (initialState: IState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const startGame = useCallback(() => {
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
    }, [state.allLetters.available])

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
