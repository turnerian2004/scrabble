import { useReducer } from 'react'
import { IState } from './InitialState'
import {
    ComputerSkillLevel,
    freeDictionaryApiResponse,
    UserActions,
} from '../Definitions'
import { reducer } from './reducer'
import { getRecommendedWords } from '../Helpers/GetRecommendedWords'
import { distributeLettersAtGameStart } from '../Helpers/GetStartingLetters'
import { ILetter, ILetters } from '../Letters/Letters'
import { letterDropPayloadProps } from '../Components/GameBoardTile'

export const useScrabbleContext = (initialState: IState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('state: ', state)

    const startGame = async () => {
        const computerStartingWord: freeDictionaryApiResponse =
            await getRecommendedWords(
                state.allLetters.computer,
                state.computerSkillLevel as ComputerSkillLevel
            )

        const cleanComputerStartingWord = computerStartingWord

        dispatch({
            type: UserActions.StartGame,
            payload: cleanComputerStartingWord,
        })
    }

    const proceedToOpponentPage = () => {
        const [availableLetters, personLetters, computerLetters] =
            distributeLettersAtGameStart(state.allLetters.available)
        const boardLetters: ILetter[] = []
        const updatedLetters: ILetters = {
            available: availableLetters,
            computer: computerLetters,
            person: personLetters,
            board: boardLetters,
        }

        dispatch({
            type: UserActions.ProceedToOpponentSelectPage,
            payload: updatedLetters,
        })
    }

    const selectHintHelpLevel = (levelSupportRequested: string) => {
        dispatch({
            type: UserActions.LevelSupportRequested,
            payload: levelSupportRequested,
        })
    }

    const selectComputerSkillLevel = (computerSkillLevel: string) => {
        dispatch({
            type: UserActions.SelectComputerSkillLevel,
            payload: computerSkillLevel,
        })
    }

    const selectHintType = (hintTypeRequested: string) => {
        dispatch({
            type: UserActions.HintTypeRequested,
            payload: hintTypeRequested,
        })
    }

    const gameTimeLimit = (gameTimeLimit: string) => {
        dispatch({
            type: UserActions.GameTimeLimit,
            payload: gameTimeLimit,
        })
    }

    const turnTimeLimit = (turnTimeLimit: string) => {
        dispatch({
            type: UserActions.TurnTimeLimit,
            payload: turnTimeLimit,
        })
    }

    const moveLetterToBoard = (
        letterDropInfo: letterDropPayloadProps
    ) => {
        dispatch({
            type: UserActions.MoveLetterToBoard,
            payload: letterDropInfo,
        })
    }

    return {
        state,
        proceedToOpponentPage,
        selectComputerSkillLevel,
        gameTimeLimit,
        turnTimeLimit,
        startGame,
        moveLetterToBoard,
        selectHintHelpLevel,
        selectHintType,
    }
}
