import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { LetterTileProps } from './LetterTile'
import { useMoveLetterToBoard } from '../Context/CustomHooks'
import classNames from 'classnames'

export const GameBoardTile: React.FC = () => {
    const [droppedItem, setDroppedItem] =
        useState<LetterTileProps | null>(null)
    const { moveLetterToBoard } = useMoveLetterToBoard()

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.LETTERTILE,
        drop: (item: LetterTileProps) => {
            if (droppedItem === null) {
                setDroppedItem(item)
                moveLetterToBoard(item.uniqueIdentifier)
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    })

    return (
        <div
            ref={dropRef}
            className={classNames(
                'relative flex h-6 w-6 items-center justify-center rounded-md',
                { 'border border-black bg-zinc-300': !droppedItem },
                { 'bg-[#facd9f]': !!droppedItem },
                {
                    'border-2 border-black outline outline-black':
                        isOver,
                }
            )}>
            {droppedItem ? (
                <>
                    <div className="text-base font-bold capitalize">
                        {droppedItem.character}
                    </div>
                    <div className="absolute bottom-0 right-0 text-[8px]">
                        {droppedItem.pointValue}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    )
}
