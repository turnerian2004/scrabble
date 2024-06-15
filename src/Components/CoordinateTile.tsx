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
                'flex h-6 w-6 items-center justify-center rounded-md border-2 border-black text-center text-[10px]'
            }>
            {character}
        </div>
    )
}
