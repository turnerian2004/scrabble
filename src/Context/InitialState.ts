import { LetterTileProps } from '../Components/LetterTile'
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
    testLetters: LetterTileProps[]
}

export const initialLetters: ILetters = {
    available: initializeLetterObjects(),
    computer: [],
    person: [],
    board: [],
}

const letterTiles = [
    {
        character: 'a',
        pointValue: 1,
        uniqueIdentifier: 'a1',
    },
    {
        character: 'b',
        pointValue: 2,
        uniqueIdentifier: 'b1',
    },
    {
        character: 'c',
        pointValue: 3,
        uniqueIdentifier: 'c3',
    },
]

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
    testLetters: letterTiles,
}
