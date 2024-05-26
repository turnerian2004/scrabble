import { useContext } from 'react'
import { LetterTile } from '../Components/LetterTile'
import { ScrabbleContext } from '../Context/ScrabbleContext'
import { GameBoard } from '../Components/GameBoard'

export const GamePage = () => {
    const { state } = useContext(ScrabbleContext)
    const personLetters = state.allLetters.person

    console.log('gamepage: ', personLetters)

    return (
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <div>
                {personLetters.map((letter, index) => (
                    <LetterTile {...letter} key={index} />
                ))}
            </div>
            <div>
                <GameBoard></GameBoard>
            </div>
        </div>
    )
}
