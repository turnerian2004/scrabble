import { welcomeMessage } from '../Definitions'
import { IntroCard } from '../Components/IntroCard'
import { useProceedToOpponentPage } from '../Context/CustomHooks'
import { useNavigate } from 'react-router-dom'
import { UserButton } from '../Components/UserButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useEffect, useState } from 'react'
import { GameBoard } from '../Components/GameBoard'

export const WelcomePage = () => {
    const [showArrowDownwardIcon, setShowArrowDownwardIcon] =
        useState(true)

    const { proceedToOpponentPage } = useProceedToOpponentPage()
    const navigate = useNavigate()

    const handleWelcome = () => {
        proceedToOpponentPage()
        navigate('/visitor')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowArrowDownwardIcon(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="grid h-screen grid-cols-2 justify-center gap-16">
            <div className="flex items-center justify-end">
                <GameBoard></GameBoard>
            </div>
            <div className="flex flex-col justify-center">
                <IntroCard message={welcomeMessage} />
                <div className="ml-[190px] h-[30px]">
                    {showArrowDownwardIcon && (
                        <div className="animate-bounce">
                            <ArrowDownwardIcon />
                        </div>
                    )}
                </div>
                <div className="ml-[136px]">
                    <UserButton
                        onClick={handleWelcome}
                        title={'Next Page'}
                    />
                </div>
            </div>
        </div>
    )
}
