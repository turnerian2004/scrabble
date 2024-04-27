import React from 'react'
import Button from '@mui/material/Button'
import { ILetters } from '../Letters/Letters'
import { UserActions } from '../Definitions'
import { useStartButton } from '../Context/customHooks'
import { useNavigate } from 'react-router-dom'

export interface IStartAction {
    type: UserActions
    payload: ILetters
}

export const StartButton: React.FC = () => {
    const { hasGameStarted, startGame } = useStartButton()
    const navigate = useNavigate()

    console.log('hasGameStarted: ', hasGameStarted)

    const handleClick = () => {
        startGame()

        navigate('/visitor')
    }

    return (
        <Button
            style={{ textTransform: 'none' }}
            variant="outlined"
            onClick={handleClick}
            className="absolute"
        >
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
            </div>
            Start!
        </Button>
    )
}

export default StartButton
