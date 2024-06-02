import React, { useContext } from 'react'
import { ScrabbleContext } from '../Context/ScrabbleContext'

export const GameBoard: React.FC = () => {
    const { state } = useContext(ScrabbleContext)

    return (
        <div className="grid w-[500px] grid-cols-16 items-center justify-around gap-1 rounded-md bg-pink-400 p-2">
            {state.board}
        </div>
    )
}
