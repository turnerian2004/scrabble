import { welcomeMessage } from '../Definitions'
import { IntroCard } from '../Introduction/IntroCard'
import { useProceedToOpponentPage } from '../Context/CustomHooks'
import { useNavigate } from 'react-router-dom'
import { UserButton } from '../Components/UserButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useEffect, useState } from 'react'

export const WelcomePage = () => {
    const [showButton, setShowButton] = useState(false)
    const [showArrowDownwardIcon, setShowArrowDownwardIcon] =
        useState(false)

    const { proceedToOpponentPage } = useProceedToOpponentPage()
    const navigate = useNavigate()

    const handleWelcome = () => {
        proceedToOpponentPage()
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
        <div className="grid h-screen grid-cols-2 justify-center gap-4">
            <div></div>
            <div className="flex flex-col items-center justify-center">
                <IntroCard message={welcomeMessage}></IntroCard>
                {showArrowDownwardIcon && (
                    <div className="animate-bounce">
                        <ArrowDownwardIcon></ArrowDownwardIcon>
                    </div>
                )}
                {showButton && (
                    <UserButton
                        onClick={handleWelcome}
                        title={'Start!'}
                    ></UserButton>
                )}
            </div>
        </div>
    )
}
