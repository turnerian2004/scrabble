import { ILetters, initializeLetterObjects } from '../Letters/Letters'

export interface IState {
    letters: ILetters
    isGameOver: boolean
    hasGameStarted: boolean
}

const initialLetters: ILetters = {
    available: initializeLetterObjects(),
    computer: [],
    person: [],
    board: [],
}

export const initialState: IState = {
    letters: initialLetters,
    isGameOver: false,
    hasGameStarted: false,
}
