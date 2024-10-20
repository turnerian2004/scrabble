import React, { useContext } from 'react'
import { alphabet, yCoordinates } from '../Definitions'
import { CoordinateTiles } from './CoordinateTiles'
import { ScrabbleContext } from '../Context/context'

export const GameBoard: React.FC = () => {
    const { state } = useContext(ScrabbleContext)

    const board = state.board

    return (
        <div className="flex flex-col border-2 border-black">
            <CoordinateTiles
                coordinates={alphabet}
                classes="grid grid-cols-16"
            />
            <div className="grid grid-cols-16">
                <div className="col-start-1 col-end-1 grid grid-rows-15">
                    <CoordinateTiles coordinates={yCoordinates} />
                </div>
                <div
                    className="col-start-2 col-end-17 grid grid-cols-15 justify-center"
                    data-testid="gameboard-tile">
                    {board.map(letterTile => (
                        <div className="h-full w-full">
                            {letterTile}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
