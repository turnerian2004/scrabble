import React, { useContext } from 'react'
import { alphabet, yCoordinates } from '../Definitions'
import { CoordinateRow } from './CoordinateRow'
import { ScrabbleContext } from '../Context/ScrabbleContext'

export const GameBoard: React.FC = () => {
    const { state } = useContext(ScrabbleContext)

    return (
        <div className="flex flex-col">
            <CoordinateRow
                coordinates={alphabet}
                classes="grid grid-cols-16"
            />
            <div className="grid grid-cols-16">
                <div
                    className="grid-rows-15 col-start-1 col-end-1 grid"
                    data-testid="small">
                    <CoordinateRow coordinates={yCoordinates} />
                </div>
                <div
                    className="col-end-17 grid-cols-15 col-start-2 grid justify-center"
                    data-testid="small">
                    {state.board}
                </div>
            </div>
        </div>
    )
}
