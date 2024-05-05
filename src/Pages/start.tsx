import { welcomeMessage } from '../Definitions'
import { IntroCard } from '../Introduction/IntroCard'
import { StartButton } from '../StartButton/StartButton'

export const StartPage = () => {
    return (
        <div className="grid grid-cols-2 gap-4 h-screen">
            <div></div>
            <div className="space-y-4 content-center">
                <IntroCard message={welcomeMessage}></IntroCard>
                <div className="flex justify-center">
                    <StartButton></StartButton>
                </div>
            </div>
        </div>
    )
}
