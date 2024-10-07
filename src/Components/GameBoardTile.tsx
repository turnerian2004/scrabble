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
    letter?: string
}

export const GameBoardTile: React.FC<GameBoardTileProps> = ({
    xCoordinate,
    yCoordinate,
    letter,
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
                'rounded-m relative flex h-8 w-8 items-center justify-center bg-[#facd9f]',
                {
                    '': isOver,
                }
            )}
            data-testid="gameboard-tile">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
                {droppedItem ? (
                    <div>
                        <div className="pl-[2px] text-base font-bold capitalize">
                            {droppedItem.character}
                            <sub className="text-[6px]">
                                {droppedItem.pointValue}
                            </sub>
                        </div>
                    </div>
                ) : (
                    <div>{letter}</div>
                )}
            </div>
        </div>
    )
}
