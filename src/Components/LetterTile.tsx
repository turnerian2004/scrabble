import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../Constants'
import classNames from 'classnames'

export interface LetterTileProps {
    character: string
    pointValue: number
    uniqueIdentifier: string
}

export const LetterTile: React.FC<LetterTileProps> = ({
    character,
    pointValue,
    uniqueIdentifier,
}) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.LETTERTILE,
        item: { character, pointValue, uniqueIdentifier },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div
            ref={dragRef}
            className={classNames(
                'grid h-10 w-10 cursor-pointer grid-rows-5 items-center justify-center rounded-md border-2 border-[#1977d3]',
                { hidden: isDragging }
            )}>
            <div className="row-span-3 w-full text-center text-lg font-bold capitalize">
                {character}
            </div>
            <div className="row-span-2 w-full text-center text-xs font-light">
                {pointValue}
            </div>
        </div>
    )
}
