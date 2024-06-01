import React from 'react'
import { LetterTile, LetterTileProps } from './LetterTile'

export interface LetterTilesDisplayProps {
    letterTiles: LetterTileProps[]
}

export const LetterTilesDisplay: React.FC<
    LetterTilesDisplayProps
> = ({ letterTiles }) => {
    return (
        <div className="flex h-12 w-80 cursor-pointer items-center justify-around rounded-md border-2 border-[#1977d3]">
            {letterTiles.map((letterTile, index) => (
                <LetterTile
                    key={index}
                    character={letterTile.character}
                    pointValue={letterTile.pointValue}
                    uniqueIdentifier={letterTile.uniqueIdentifier}
                />
            ))}
        </div>
    )
}
