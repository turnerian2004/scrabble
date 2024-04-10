import { useReducer } from 'react'

import './App.css'
import { IState, initialState } from './State/initialState'
import { IStartAction, StartButton } from './StartButton/StartButton'
import { distributeLettersAtGameStart } from './Utils/getStartingLetters'
import { ILetter, ILetters } from './Letters/Letters'
import {
    BasicSelect,
    IUserActionBasicSelect,
} from './BasicSelect/BasicSelect'
import {
    UserActions,
    computerSkillLevel,
    welcomeMessage,
} from './Definitions'
import { IntroCard } from './Introduction/IntroCard'

function reducer(
    state: IState,
    action: IStartAction | IUserActionBasicSelect
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
            const recommendedWord = (action as IUserActionBasicSelect)
                .payload[0]

            const initialRecommendedWords = (
                action as IUserActionBasicSelect
            ).payload[1]

            const computerSkillLevel = (
                action as IUserActionBasicSelect
            ).payload[2]

            const invalidWords = (action as IUserActionBasicSelect)
                .payload[3]

            const recommendedWords = initialRecommendedWords.filter(
                (recommendedWord) =>
                    !invalidWords.includes(recommendedWord)
            )

            return {
                ...state,
                bestRecommendedWord: recommendedWord,
                computerSkillLevel: computerSkillLevel,
                recommendedWords: recommendedWords,
            }
        }

        default:
            return state
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state: ', state)

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div data-testid="1"></div>
                <div
                    data-testid="2"
                    className="h-screen flex items-center justify-center"
                >
                    {!state.hasGameStarted && (
                        <>
                            <div className="flex flex-col items-center justify-center">
                                <IntroCard
                                    message={welcomeMessage}
                                ></IntroCard>
                                <StartButton dispatch={dispatch} />
                            </div>
                        </>
                    )}
                    {state.hasGameStarted &&
                        state.computerSkillLevel === null && (
                            <div className="w-48 h-5">
                                <BasicSelect
                                    options={computerSkillLevel}
                                    title={'Opponent Skill Level'}
                                    dispatch={dispatch}
                                    playerLetters={
                                        state.allLetters.computer
                                    }
                                ></BasicSelect>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}

export default App
