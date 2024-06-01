import React from 'react'
import { GameBoardTile } from './GameBoardTile'
import { GameTerms, alphabet } from '../Definitions'

export const GameBoard: React.FC = () => {
    const board: React.ReactNode[] = []

    board.push(<div></div>)

    for (let i = 0; i < alphabet.length; i++) {
        board.push(
            <div key={i} className="flex items-center justify-center">
                {alphabet[i]}
            </div>
        )
    }

    for (let y = 0; y < GameTerms.BoardDimension; y++) {
        for (let x = 0; x < GameTerms.BoardDimension; x++) {
            if (x !== 0) {
                board.push(
                    <div className="flex items-center justify-center">
                        <GameBoardTile
                            key={`${x}-${y}`}
                            xCoordinate={x}
                            yCoordinate={y}
                        />
                    </div>
                )
            }

            if (x === 0) {
                board.push(
                    <div className="flex items-center justify-center text-center">
                        {y}
                    </div>
                )
            }
        }
    }

    console.log('board: ', board)

    return (
        <div className="grid-cols-16 grid w-[420px] items-center justify-around gap-1 rounded-md bg-pink-400 p-2">
            {board}
        </div>
    )
}
