import { ILetter, initializeLetterObjects } from '../Letters/Letters'

export interface IState {
    letters: ILetter[]
}

const initialLetters: ILetter[] = initializeLetterObjects()

export const initialState: IState = {
    letters: initialLetters,
}
