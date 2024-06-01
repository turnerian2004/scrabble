import React from 'react'
import { GameBoardTile } from './GameBoardTile'
import { GameTerms, alphabet } from '../Definitions'

export const GameBoard: React.FC = () => {
    const board: React.ReactNode[] = []

    board.push(<div></div>)

    for (let i = 0; i < alphabet.length; i++) {
        board.push(
            <div
                key={i}
                className="flex items-center justify-center uppercase">
                {alphabet[i]}
            </div>
        )
    }

    for (let y = 0; y < GameTerms.BoardDimension; y++) {
        for (let x = 0; x < GameTerms.BoardDimension; x++) {
            if (x !== 0) {
                board.push(
                    <div className="h-6.5 w-6.5 flex items-center justify-center gap-3">
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
        <div className="grid w-[500px] grid-cols-16 items-center justify-around gap-1 rounded-md bg-pink-400 p-2">
            {board}
        </div>
    )
}
