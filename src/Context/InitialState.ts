import React from 'react'
import { ILetters, initializeLetterObjects } from '../Letters/Letters'
import { WordEntry } from '../assests/words'
import { initializeBoard } from '../Helpers/InitializeBoard'

export interface IState {
    allLetters: ILetters
    isGameOver: boolean
    hasGameStarted: boolean
    proceedToOpponentSelectPage: boolean
    computerSkillLevel: string
    gameTimeLimit: string
    turnTimeLimit: string
    computerRecommendedWord: WordEntry | null
    recommendedWords: WordEntry[] | null
    personsRequestedLevelOfSupport: string
    personsRequestedHintType: string
    personScore: number
    computerScore: number
    board: React.ReactNode[]
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
    computerSkillLevel: '',
    gameTimeLimit: '',
    turnTimeLimit: '',
    computerRecommendedWord: null,
    recommendedWords: null,
    personsRequestedLevelOfSupport: '',
    personsRequestedHintType: '',
    personScore: 0,
    computerScore: 0,
    board: initializeBoard(),
}
