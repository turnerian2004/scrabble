import { useReducer } from 'react'

import './App.css'
import { IState, initialState } from './State/initialState'
import { StartButton } from './StartButton/StartButton'
import { UserActions } from './State/UserActions'
import { distributeLettersAtGameStart } from './Utils/getStartingLetters'
import { ILetter, ILetters } from './Letters/Letters'
import { getComputerStartingWord } from './Utils/getComputerWords'

export interface IUserAction {
    // TODO: move to better location
    type: UserActions
}

function reducer(state: IState, action: IUserAction) {
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
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)

    return (
        <>
            <StartButton dispatch={dispatch} />
            <div>Coming Soon!</div>
        </>
    )
}

export default App
