import { useContext } from 'react'
import { ScrabbleContext } from './ScrabbleContext'
import { IState } from './InitialState'

type useStartButtonType = {
    startGame: () => void
}

export const useStartButton = (): useStartButtonType => {
    const { startGame } = useContext(ScrabbleContext)

    return { startGame }
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

type useScrabbleStateType = {
    state: IState
}

export const useScrabbleState = (): useScrabbleStateType => {
    const { state } = useContext(ScrabbleContext)

    return { state }
}
