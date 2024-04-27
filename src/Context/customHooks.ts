import { useContext } from 'react'
import { ScrabbleContext } from './ScrabbleContext'

type useStartButtonType = {
    hasGameStarted: boolean
    startGame: () => void
}

export const useStartButton = (): useStartButtonType => {
    const {
        state: { hasGameStarted },
        startGame,
    } = useContext(ScrabbleContext)

    return {
        hasGameStarted,
        startGame,
    }
}
