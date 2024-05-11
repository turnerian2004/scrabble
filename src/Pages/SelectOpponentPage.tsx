import { UserSelectMenu } from '../Components/UserSelectMenu'
import {
    useGameTimeLimit,
    useTurnTimeLimit,
    useSelectComputerSkillLevel,
} from '../Context/CustomHooks'
import {
    computerSkillLevel,
    turnTimeLimitOptions,
    gameTimeLimitOptions,
} from '../Definitions'
import { UserButton } from '../Components/UserButton'

export const VisitorPage = () => {
    const { selectComputerSkillLevel } = useSelectComputerSkillLevel()
    const { gameTimeLimit } = useGameTimeLimit()
    const { turnTimeLimit } = useTurnTimeLimit()

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
                    <UserSelectMenu
                        title="Turn Time Limit"
                        options={turnTimeLimitOptions}
                        onClick={turnTimeLimit}
                    ></UserSelectMenu>
                    <UserSelectMenu
                        title="Game Time Limit"
                        options={gameTimeLimitOptions}
                        onClick={gameTimeLimit}
                    ></UserSelectMenu>
                    <UserButton
                        onClick={() =>
                            console.log('opponent select page')
                        }
                        title={'Start Game!'}
                    ></UserButton>
                </div>
            </div>
        </>
    )
}
