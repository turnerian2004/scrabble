import React from 'react'
import { ILetters, initializeLetterObjects } from '../Letters/Letters'
import { WordEntry } from '../assests/words'
import { buildBoard } from '../Utils/initBoard'

export interface IState {
    allLetters: ILetters
    isGameOver: boolean
    hasGameStarted: boolean
    proceedToOpponentSelectPage: boolean
    computerSkillLevel: string
    gameTimeLimit: string
    turnTimeLimit: string
    computerRecommendedWord: string
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
    computerRecommendedWord: '',
    recommendedWords: null,
    personsRequestedLevelOfSupport: '',
    personsRequestedHintType: '',
    personScore: 0,
    computerScore: 0,
    board: buildBoard(),
}
