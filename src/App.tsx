import { useReducer } from 'react'

import './App.css'
import { IState, initialState } from './State/initialState'
import { IStartAction, StartButton } from './StartButton/StartButton'
import { distributeLettersAtGameStart } from './Utils/getStartingLetters'
import { ILetter, ILetters } from './Letters/Letters'
import {
    OppenentSkillLevelSelect,
    IOpponentDispatch as IOpponentDispatch,
} from './SelectMenu/OpponentSkillLevelSelect'
import {
    UserActions,
    computerSkillLevel,
    hintLevel,
    welcomeMessage,
    wordHintType,
} from './Definitions'
import { IntroCard } from './Introduction/IntroCard'
import { BasicSelect, IBasicDispatch } from './SelectMenu/BasicSelect'

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
                                <OppenentSkillLevelSelect
                                    options={computerSkillLevel}
                                    title={'Opponent Skill Level'}
                                    dispatch={dispatch}
                                    playerLetters={
                                        state.allLetters.computer
                                    }
                                ></OppenentSkillLevelSelect>
                            </div>
                        )}

                    {state.hasGameStarted &&
                        state.computerSkillLevel !== null && (
                            <div>
                                <BasicSelect
                                    title="Level of Support"
                                    options={hintLevel}
                                    dispatch={dispatch}
                                    type={
                                        UserActions.LEVELSUPPORTREQUESTED
                                    }
                                ></BasicSelect>

                                <BasicSelect
                                    title="Hint Type"
                                    options={wordHintType}
                                    dispatch={dispatch}
                                    type={
                                        UserActions.HINTTYPEREQUESTED
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
