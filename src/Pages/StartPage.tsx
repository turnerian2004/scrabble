import { welcomeMessage } from '../Definitions'
import { IntroCard } from '../Introduction/IntroCard'
import { useStartButton } from '../Context/CustomHooks'
import { useNavigate } from 'react-router-dom'
import { UserButton } from '../Components/UserButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useEffect, useState } from 'react'

export const StartPage = () => {
    const [showButton, setShowButton] = useState(false)
    const [showArrowDownwardIcon, setShowArrowDownwardIcon] =
        useState(false)

    const { startGame } = useStartButton()
    const navigate = useNavigate()

    const handleStartGame = () => {
        startGame()
        navigate('/visitor')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowArrowDownwardIcon(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="grid grid-cols-2 gap-4 h-screen justify-center">
            <div></div>
            <div className="flex flex-col justify-center items-center">
                <IntroCard message={welcomeMessage}></IntroCard>
                {showArrowDownwardIcon && (
                    <div className="animate-bounce">
                        <ArrowDownwardIcon></ArrowDownwardIcon>
                    </div>
                )}
                {showButton && (
                    <UserButton
                        onClick={handleStartGame}
                        title={'Start!'}
                    ></UserButton>
                )}
            </div>
        </div>
    )
}
