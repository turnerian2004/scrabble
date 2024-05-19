import { LetterTile } from '../Components/LetterTile'

export const GamePage = () => {
    return (
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <LetterTile character="j" pointValue={10}></LetterTile>
            <div>Player Statistics</div>
        </div>
    )
}
