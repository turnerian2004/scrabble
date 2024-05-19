import React from 'react'

export interface LetterTileProps {
    character: string
    pointValue: number
}

export const LetterTile: React.FC<LetterTileProps> = ({
    character,
    pointValue,
}) => {
    return (
        <div className="grid h-10 w-10 cursor-pointer grid-rows-5 items-center justify-center rounded-md border-2 border-[#1977d3]">
            <div className="row-span-3 text-lg font-bold capitalize">
                {character}
            </div>
            <div className="row-span-2 text-xs font-light">
                {pointValue}
            </div>
        </div>
    )
}
