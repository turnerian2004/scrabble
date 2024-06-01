import { UserSelectMenu } from '../Components/UserSelectMenu'
import {
    useGameTimeLimit,
    useTurnTimeLimit,
    useSelectComputerSkillLevel,
    useScrabbleState,
    useStartGame,
} from '../Context/CustomHooks'
import {
    computerSkillLevel,
    turnTimeLimitOptions,
    gameTimeLimitOptions,
} from '../Definitions'
import { UserButton } from '../Components/UserButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { GameBoard } from '../Components/GameBoard'

export const VisitorPage = () => {
    const { selectComputerSkillLevel } = useSelectComputerSkillLevel()
    const { gameTimeLimit } = useGameTimeLimit()
    const { turnTimeLimit } = useTurnTimeLimit()
    const { state } = useScrabbleState()
    const { startGame } = useStartGame()

    const navigate = useNavigate()

    useEffect(() => {
        if (state.proceedToOpponentSelectPage === false) {
            navigate('/')
        }
    })

    const handleClick = () => {
        startGame()
        navigate('/game')
    }

    return (
        <>
            <div className="grid h-screen grid-cols-2 justify-center gap-4">
                <div className="flex items-center justify-center">
                    <GameBoard></GameBoard>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <UserSelectMenu
                        title="Computer Skill Level"
                        options={computerSkillLevel}
                        onClick={
                            selectComputerSkillLevel
                        }></UserSelectMenu>
                    {state.computerSkillLevel !== null && (
                        <UserSelectMenu
                            title="Turn Time Limit"
                            options={turnTimeLimitOptions}
                            onClick={turnTimeLimit}></UserSelectMenu>
                    )}
                    {state.turnTimeLimit !== null && (
                        <UserSelectMenu
                            title="Game Time Limit"
                            options={gameTimeLimitOptions}
                            onClick={gameTimeLimit}></UserSelectMenu>
                    )}
                    {state.gameTimeLimit !== null && (
                        <UserButton
                            onClick={() => {
                                handleClick()
                            }}
                            title={'Start'}></UserButton>
                    )}
                </div>
            </div>
        </>
    )
}
