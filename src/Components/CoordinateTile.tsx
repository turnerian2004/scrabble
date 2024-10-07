import React from 'react'

export interface CoordinateTileProps {
    character: string
}

export const CoordinateTile: React.FC<CoordinateTileProps> = ({
    character,
}) => {
    return (
        <div
            className={
                'flex h-8 w-8 items-center justify-center bg-[#facd9f] text-center'
            }
            data-testid="coordinate-tile">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-lg font-bold uppercase">
                {character}
            </div>
        </div>
    )
}
