import { freeDictionaryApiResponse } from '../Definitions'
import { ILetters, initializeLetterObjects } from '../Letters/Letters'
import { WordEntry } from '../assests/words'

export interface IState {
    allLetters: ILetters
    isGameOver: boolean
    hasGameStarted: boolean
    proceedToOpponentSelectPage: boolean
    computerSkillLevel: string | null
    gameTimeLimit: string | null
    turnTimeLimit: string | null
    bestRecommendedWord: freeDictionaryApiResponse | null
    recommendedWords: WordEntry[] | null
    personsRequestedLevelOfSupport: null | string
    personsRequestedHintType: null | string
    personScore: number
    computerScore: number
}

export const initialLetters: ILetters = {
    available: initializeLetterObjects(),
    computer: [],
    person: [],
    board: [],
}

export const initialState: IState = {
    allLetters: initialLetters,
    isGameOver: false,
    hasGameStarted: false,
    proceedToOpponentSelectPage: false,
    computerSkillLevel: null,
    gameTimeLimit: null,
    turnTimeLimit: null,
    bestRecommendedWord: null,
    recommendedWords: null,
    personsRequestedLevelOfSupport: null,
    personsRequestedHintType: null,
    personScore: 0,
    computerScore: 0,
}
