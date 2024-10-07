import { useContext } from 'react'
import { ScrabbleContext } from '../Context/context'
import { GameBoard } from '../Components/GameBoard'
import { LetterTilesDisplay } from '../Components/LetterTilesDisplay'
import { UserSelectMenu } from '../Components/UserSelectMenu'
import { hintHelpLevel, wordHintType } from '../Definitions'
import {
    useSelectHintHelpLevel,
    useSelectHintType,
} from '../Context/CustomHooks'
import { ScoreDisplay } from '../Components/ScoreDisplay'

export const GamePage = () => {
    const { state } = useContext(ScrabbleContext)
    const personLetters = state.allLetters.person
    const { selectHintHelpLevel } = useSelectHintHelpLevel()
    const { selectHintType } = useSelectHintType()

    return (
        <div className="grid h-screen grid-cols-2 gap-16">
            <div className="my-auto grid w-full grid-cols-1 justify-items-end">
                <div className="flex flex-col items-center gap-4">
                    <GameBoard />
                    <LetterTilesDisplay letterTiles={personLetters} />
                </div>
            </div>
            <div className="my-auto grid w-full grid-rows-3 justify-items-start gap-4">
                <div className="flex h-full w-full items-center justify-around">
                    <UserSelectMenu
                        title="Level of Support"
                        options={hintHelpLevel}
                        onClick={selectHintHelpLevel}
                    />
                    <UserSelectMenu
                        title="Hint Type"
                        options={wordHintType}
                        onClick={selectHintType}
                    />
                </div>
                <div></div>
                <div className="flex h-full w-full items-center justify-around">
                    <ScoreDisplay playerScore={state.personScore} />
                    <ScoreDisplay playerScore={state.computerScore} />
                </div>
            </div>
        </div>
    )
}
