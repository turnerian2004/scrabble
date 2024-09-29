import { useContext } from 'react'
// import { ScrabbleContext } from './gameReducer'
import { ScrabbleContext } from './context'
import { IState } from './InitialState'
import { letterDropPayloadProps } from '../Components/GameBoardTile'

type useStartGameType = {
    startGame: () => void
}

export const useStartGame = (): useStartGameType => {
    const { startGame } = useContext(ScrabbleContext)

    return { startGame }
}

type useProceedToOpponentPageType = {
    proceedToOpponentPage: () => void
}

export const useProceedToOpponentPage =
    (): useProceedToOpponentPageType => {
        const { proceedToOpponentPage } = useContext(ScrabbleContext)

        return { proceedToOpponentPage }
    }

type useSelectHintType = {
    selectHintType: (hintType: string) => void
}

export const useSelectHintType = (): useSelectHintType => {
    const { selectHintType } = useContext(ScrabbleContext)

    return { selectHintType }
}

type useSelectHintHelpLevelType = {
    selectHintHelpLevel: (hintHelpLevel: string) => void
}

export const useSelectHintHelpLevel =
    (): useSelectHintHelpLevelType => {
        const { selectHintHelpLevel } = useContext(ScrabbleContext)

        return { selectHintHelpLevel }
    }

type useSelectComputerSkillLevelType = {
    selectComputerSkillLevel: (computerSkillLevel: string) => void
}

export const useSelectComputerSkillLevel =
    (): useSelectComputerSkillLevelType => {
        const { selectComputerSkillLevel } =
            useContext(ScrabbleContext)

        return { selectComputerSkillLevel }
    }

type useGameTimeLimitType = {
    gameTimeLimit: (gameTimeLimit: string) => void
}

export const useGameTimeLimit = (): useGameTimeLimitType => {
    const { gameTimeLimit } = useContext(ScrabbleContext)

    return { gameTimeLimit }
}

type useTurnTimeLimitType = {
    turnTimeLimit: (turnTimeLimit: string) => void
}

export const useTurnTimeLimit = (): useTurnTimeLimitType => {
    const { turnTimeLimit } = useContext(ScrabbleContext)

    return { turnTimeLimit }
}

type useMoveLetterToBoardType = {
    moveLetterToBoard: (
        letterDropInfo: letterDropPayloadProps
    ) => void
}

export const useMoveLetterToBoard = (): useMoveLetterToBoardType => {
    const { moveLetterToBoard } = useContext(ScrabbleContext)

    return { moveLetterToBoard }
}

type useScrabbleStateType = {
    state: IState
}

export const useScrabbleState = (): useScrabbleStateType => {
    const { state } = useContext(ScrabbleContext)

    return { state }
}
