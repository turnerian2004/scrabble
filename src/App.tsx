import { useReducer } from 'react'

import './App.css'
import { IState, initialState } from './State/initialState'
import { IUserAction, StartButton } from './StartButton/StartButton'
import { UserActions } from './State/UserActions'
import { distributeLettersAtGameStart } from './Utils/getStartingLetters'
import { ILetter, ILetters } from './Letters/Letters'
import { getComputerStartingWord } from './Utils/getComputerWords'
import {
    BasicMenu,
    IUserActionBasicMenu,
} from './BasicMenu/BasicMenu'
import { computerSkillLevel, wordHintType } from './BasicMenu/options'

function reducer(
    state: IState,
    action: IUserAction | IUserActionBasicMenu
) {
    switch (action.type) {
        case UserActions.STARTGAME: {
            const [availableLetters, personLetters, computerLetters] =
                distributeLettersAtGameStart(state.letters.available)
            const boardLetters: ILetter[] = []
            const updatedLetters: ILetters = {
                available: availableLetters,
                computer: computerLetters,
                person: personLetters,
                board: boardLetters,
            }

            getComputerStartingWord(updatedLetters.computer)

            return {
                ...state,
                letters: updatedLetters,
                hasGameStarted: true,
            }
        }

        case UserActions.SELECTCOMPUTERSKILLLEVEL: {
            const computerSkillLevel = (
                action as IUserActionBasicMenu
            ).payload

            return {
                ...state,
                computerSkillLevel: computerSkillLevel,
            }
        }
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)

    return (
        <>
            <StartButton dispatch={dispatch} />
            <BasicMenu
                options={computerSkillLevel}
                title={'Computer Skill Level'}
                dispatch={dispatch}
            ></BasicMenu>
            <BasicMenu
                options={wordHintType}
                title={'Word Hint Type'}
                dispatch={dispatch}
            ></BasicMenu>

            <div className="text-red-400">Coming Soon!</div>
        </>
    )
}

export default App
