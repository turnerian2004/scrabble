import { useContext } from 'react'
import { GameBoardTile } from '../Components/GameBoardTile'
import { LetterTile } from '../Components/LetterTile'
import { ScrabbleContext } from '../Context/ScrabbleContext'

export const GamePage = () => {
    const { state } = useContext(ScrabbleContext)

    return (
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <div>
                <LetterTile {...state.testLetters[0]}></LetterTile>
                <LetterTile {...state.testLetters[1]}></LetterTile>
                <LetterTile {...state.testLetters[2]}></LetterTile>
            </div>
            <div>
                <GameBoardTile />
            </div>
        </div>
    )
}
