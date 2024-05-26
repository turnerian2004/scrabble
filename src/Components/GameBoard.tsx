import React from 'react'
import { GameBoardTile } from './GameBoardTile'
import { GameTerms } from '../Definitions'

export const GameBoard: React.FC = () => {
    return (
        <div className="grid grid-cols-12 items-center justify-around gap-1 bg-pink-400">
            {Array.from({
                length:
                    GameTerms.BoardDimension *
                    GameTerms.BoardDimension,
            }).map((_, index) => (
                <GameBoardTile key={index} />
            ))}
        </div>
    )
}
