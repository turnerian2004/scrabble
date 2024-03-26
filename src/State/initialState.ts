import { freeDictionaryApiResponse } from '../Definitions'
import { ILetters, initializeLetterObjects } from '../Letters/Letters'
import { WordEntry } from '../assests/words'

export interface IState {
    letters: ILetters
    isGameOver: boolean
    hasGameStarted: boolean
    computerSkillLevel: string | null
    bestRecommendedWord: freeDictionaryApiResponse | null
    recommendedWords: WordEntry[] | null
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
    computerSkillLevel: null,
    bestRecommendedWord: null,
    recommendedWords: null,
}
