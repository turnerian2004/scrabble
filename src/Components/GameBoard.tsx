import React from 'react'
import { GameBoardTile } from './GameBoardTile'
import { GameTerms } from '../Definitions'

export const GameBoard: React.FC = () => {
    const board = []

    for (let y = 0; y < GameTerms.BoardDimension; y++) {
        for (let x = 0; x < GameTerms.BoardDimension; x++) {
            board.push(
                <GameBoardTile
                    key={`${x}-${y}`}
                    xCoordinate={x}
                    yCoordinate={y}
                />
            )
        }
    }

    return (
        <div className="grid-cols-15 grid items-center justify-around gap-1 bg-pink-400 p-2">
            {board}
        </div>
    )
}
