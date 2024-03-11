import { ILetters, initializeLetterObjects } from '../Letters/Letters'

export interface IState {
    letters: ILetters
}

const initialLetters: ILetters = {
    available: initializeLetterObjects(),
    computer: [],
    person: [],
    board: [],
}

export const initialState: IState = {
    letters: initialLetters,
}
