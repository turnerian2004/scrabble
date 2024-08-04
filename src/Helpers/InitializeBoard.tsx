import React from 'react'
import { GameBoardTile } from '../Components/GameBoardTile'
import { GameTerms } from '../Definitions'
import { ILetter } from '../Letters/Letters'

export function initializeBoard(): React.ReactNode[] {
    const width = GameTerms.BoardDimension - 1
    const height = GameTerms.BoardDimension - 1

    const board: React.ReactNode[][] = []

    for (let y = 0; y < height; y++) {
        const newRow = []
        for (let x = 0; x < width; x++) {
            newRow.push(
                <GameBoardTile xCoordinate={x} yCoordinate={y} />
            )
        }
        board.push(newRow)
    }

    return board
}

export function updateBoard(
    boardLetters: ILetter[]
): React.ReactNode[] {
    const width = GameTerms.BoardDimension - 1
    const height = GameTerms.BoardDimension - 1

    const board: React.ReactNode[][] = []

    for (let y = 0; y < height; y++) {
        const newRow = []
        for (let x = 0; x < width; x++) {
            const letter = boardLetters.find(
                boardLetter =>
                    boardLetter.xCoordinate === x &&
                    boardLetter.yCoordinate === y
            )

            if (letter) {
                newRow.push(
                    <GameBoardTile
                        xCoordinate={x}
                        yCoordinate={y}
                        letter={letter.character}
                    />
                )
            }

            if (!letter) {
                newRow.push(
                    <GameBoardTile xCoordinate={x} yCoordinate={y} />
                )
            }
        }
        board.push(newRow)
    }

    return board
}
