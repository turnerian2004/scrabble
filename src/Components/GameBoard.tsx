import React, { useContext } from 'react'
import { alphabet, yCoordinates } from '../Definitions'
import { CoordinateRow } from './CoordinateRow'
import { ScrabbleContext } from '../Context/gameReducer'

export const GameBoard: React.FC = () => {
    const { state } = useContext(ScrabbleContext)

    const board = state.board

    return (
        <div className="flex flex-col">
            <CoordinateRow
                coordinates={alphabet}
                classes="grid grid-cols-16"
            />
            <div className="grid grid-cols-16">
                <div
                    className="col-start-1 col-end-1 grid grid-rows-15"
                    data-testid="small">
                    <CoordinateRow coordinates={yCoordinates} />
                </div>
                <div
                    className="col-start-2 col-end-17 grid grid-cols-15 justify-center"
                    data-testid="small">
                    {board.map(letterTile => (
                        <div>{letterTile}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
