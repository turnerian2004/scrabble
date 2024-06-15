import React from 'react'
import { GameBoardTile } from '../Components/GameBoardTile'
import { GameTerms } from '../Definitions'

export function buildBoard(): React.ReactNode[] {
    const width = GameTerms.BoardDimension - 1
    const height = GameTerms.BoardDimension - 1

    const board: React.ReactNode[] = []

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            board.push(
                <div
                    className="h-6.5 w-6.5 flex items-center justify-center"
                    key={`${x}-${y}`}>
                    <GameBoardTile xCoordinate={x} yCoordinate={y} />
                </div>
            )
        }
    }

    return board
}
