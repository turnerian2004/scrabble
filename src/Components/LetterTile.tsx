import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../Constants'

export interface LetterTileProps {
    character: string
    pointValue: number
    uniqueIdentifier: string
}

export const LetterTile: React.FC<LetterTileProps> = ({
    character,
    pointValue,
}) => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: ItemTypes.LETTERTILE,
            item: { character, pointValue },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        []
    )

    return (
        <div
            ref={dragRef}
            style={{ display: isDragging ? 'none' : '' }}
            className="grid h-10 w-10 cursor-pointer grid-rows-5 items-center justify-center rounded-md border-2 border-[#1977d3]"
        >
            <div className="row-span-3 text-lg font-bold capitalize">
                {character}
            </div>
            <div className="row-span-2 text-xs font-light">
                {pointValue}
            </div>
        </div>
    )
}
