import { welcomeMessage } from '../Definitions'
import { IntroCard } from '../Introduction/IntroCard'
import { useStartButton } from '../Context/customHooks'
import { useNavigate } from 'react-router-dom'
import { UserButton } from '../Components/UserButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export const StartPage = () => {
    const { startGame } = useStartButton()
    const navigate = useNavigate()

    const handleStartGame = () => {
        startGame()
        navigate('/visitor')
    }

    return (
        <div className="grid grid-cols-2 gap-4 h-screen justify-center">
            <div></div>
            <div className="flex flex-col justify-center items-center">
                <IntroCard message={welcomeMessage}></IntroCard>
                <div className="animate-bounce">
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                </div>
                <UserButton onClick={handleStartGame}></UserButton>
            </div>
        </div>
    )
}
