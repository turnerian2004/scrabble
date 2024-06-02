import { GameBoardTile } from '../Components/GameBoardTile'
import { GameTerms, alphabet } from '../Definitions'

export function buildBoard(): React.ReactNode[] {
    const board: React.ReactNode[] = []

    board.push(<div></div>)

    for (let i = 0; i < alphabet.length; i++) {
        board.push(
            <div
                key={i}
                className="flex items-center justify-center uppercase">
                {alphabet[i]}
            </div>
        )
    }

    for (let y = 0; y < GameTerms.BoardDimension; y++) {
        for (let x = 0; x < GameTerms.BoardDimension; x++) {
            if (x !== 0) {
                board.push(
                    <div className="h-6.5 w-6.5 flex items-center justify-center gap-3">
                        <GameBoardTile
                            key={`${x}-${y}`}
                            xCoordinate={x}
                            yCoordinate={y}
                        />
                    </div>
                )
            }

            if (x === 0) {
                board.push(
                    <div className="flex items-center justify-center text-center">
                        {y}
                    </div>
                )
            }
        }
    }

    return board
}
