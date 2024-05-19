import { UserSelectMenu } from '../Components/UserSelectMenu'
import {
    useGameTimeLimit,
    useTurnTimeLimit,
    useSelectComputerSkillLevel,
    useScrabbleState,
} from '../Context/CustomHooks'
import {
    computerSkillLevel,
    turnTimeLimitOptions,
    gameTimeLimitOptions,
} from '../Definitions'
import { UserButton } from '../Components/UserButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const VisitorPage = () => {
    const { selectComputerSkillLevel } = useSelectComputerSkillLevel()
    const { gameTimeLimit } = useGameTimeLimit()
    const { turnTimeLimit } = useTurnTimeLimit()
    const { state } = useScrabbleState()

    const navigate = useNavigate()

    useEffect(() => {
        if (state.proceedToOpponentSelectPage === false) {
            navigate('/')
        }
    })

    return (
        <>
            <div className="grid grid-cols-2 gap-4 h-screen justify-center">
                <div>Vistor Page</div>
                <div className="flex flex-col justify-center items-center">
                    <UserSelectMenu
                        title="Computer Skill Level"
                        options={computerSkillLevel}
                        onClick={selectComputerSkillLevel}
                    ></UserSelectMenu>
                    {state.computerSkillLevel !== null && (
                        <UserSelectMenu
                            title="Turn Time Limit"
                            options={turnTimeLimitOptions}
                            onClick={turnTimeLimit}
                        ></UserSelectMenu>
                    )}
                    {state.turnTimeLimit !== null && (
                        <UserSelectMenu
                            title="Game Time Limit"
                            options={gameTimeLimitOptions}
                            onClick={gameTimeLimit}
                        ></UserSelectMenu>
                    )}
                    {state.gameTimeLimit !== null && (
                        <UserButton
                            onClick={() =>
                                console.log('opponent select page')
                            }
                            title={'Start Game!'}
                        ></UserButton>
                    )}
                </div>
            </div>
        </>
    )
}
