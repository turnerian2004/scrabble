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
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <div>
                <GameBoard />
                <LetterTilesDisplay letterTiles={personLetters} />
            </div>
            <div className="grid w-full grid-rows-3">
                <div className="flex w-full justify-around">
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
                <div className="flex w-full justify-around">
                    <ScoreDisplay playerScore={state.personScore} />
                    <ScoreDisplay playerScore={state.computerScore} />
                </div>
            </div>
        </div>
    )
}
