import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { LetterTileProps } from './LetterTile'
import { useMoveLetterToBoard } from '../Context/CustomHooks'
import classNames from 'classnames'

export interface letterDropPayloadProps {
    uniqueIdentifier: string
    xCoordinate: number
    yCoordinate: number
}

export interface GameBoardTileProps {
    xCoordinate: number
    yCoordinate: number
}

export const GameBoardTile: React.FC<GameBoardTileProps> = ({
    xCoordinate,
    yCoordinate,
}) => {
    const coordinates = {
        x: xCoordinate,
        y: yCoordinate,
    }
    const [droppedItem, setDroppedItem] =
        useState<LetterTileProps | null>(null)
    const { moveLetterToBoard } = useMoveLetterToBoard()

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.LETTERTILE,
        drop: (item: LetterTileProps) => {
            const letterDropPayload: letterDropPayloadProps = {
                uniqueIdentifier: item.uniqueIdentifier,
                xCoordinate: coordinates.x,
                yCoordinate: coordinates.y,
            }

            if (droppedItem === null) {
                console.log(item.character)
                setDroppedItem(item)
                moveLetterToBoard(letterDropPayload)
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
                    <div className="absolute bottom-0 right-0 text-[6px]">
                        {droppedItem.pointValue}
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    )
}
