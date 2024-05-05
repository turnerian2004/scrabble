import { useContext } from 'react'
import { ScrabbleContext } from './ScrabbleContext'

type useStartButtonType = {
    startGame: () => void
}

export const useStartButton = (): useStartButtonType => {
    const { startGame } = useContext(ScrabbleContext)

    return {
        startGame,
    }
}
