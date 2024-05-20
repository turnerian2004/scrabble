import { useContext } from 'react'
import { GameBoardTile } from '../Components/GameBoardTile'
import { LetterTile } from '../Components/LetterTile'
import { ScrabbleContext } from '../Context/ScrabbleContext'
import { useMoveLetterToBoard } from '../Context/CustomHooks'

export const GamePage = () => {
    const { state } = useContext(ScrabbleContext)
    const personLetters = state.allLetters.person

    const { moveLetterToBoard } = useMoveLetterToBoard()

    return (
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <div>
                {personLetters.map((letter, index) => (
                    <LetterTile
                        {...letter}
                        updateStateFunc={moveLetterToBoard}
                        key={index}
                    ></LetterTile>
                ))}
            </div>
            <div>
                <GameBoardTile updateStateFunc={moveLetterToBoard} />
            </div>
        </div>
    )
}
