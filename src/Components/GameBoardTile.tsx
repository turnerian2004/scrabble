import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { LetterTileProps } from './LetterTile'

interface GameBoardTileProps {
    updateStateFunc: (uniqueIdentifer: string) => void
}

export const GameBoardTile: React.FC<GameBoardTileProps> = ({
    updateStateFunc,
}) => {
    const [droppedItem, setDroppedItem] =
        useState<LetterTileProps | null>(null)

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.LETTERTILE,
        drop: (item: LetterTileProps) => {
            if (droppedItem === null) {
                setDroppedItem(item)
                console.log('k-town')
                updateStateFunc(item.uniqueIdentifier)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.LETTERTILE,
        item: droppedItem,
        canDrag: !!droppedItem,
        end: () => setDroppedItem(null),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div
            ref={dropRef}
            className={`flex h-10 w-10 items-center justify-center bg-[#facd9f] ${isOver ? 'border border-blue-500' : ''}`}
        >
            {droppedItem ? (
                <div
                    ref={dragRef}
                    style={{ display: isDragging ? 'none' : '' }}
                    className="grid h-8 w-8 cursor-pointer grid-rows-5 items-center justify-center rounded-md border-2 border-black bg-[#fedd9b]"
                >
                    <div className="row-span-3 text-lg font-bold capitalize">
                        {droppedItem.character}
                    </div>
                    <div className="row-span-2 text-xs font-light">
                        {droppedItem.pointValue}
                    </div>
                </div>
            ) : (
                <div className="h-8 w-8 rounded-md border-2 border-black bg-[#fedd9b]"></div>
            )}
        </div>
    )
}
