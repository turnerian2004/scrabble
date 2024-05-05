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
    const { startGame } = useStartButton()
    const navigate = useNavigate()

    const handleClick = () => {
        startGame()
        navigate('/visitor')
    }

    return (
        <Button
            style={{ textTransform: 'none' }}
            variant="outlined"
            onClick={handleClick}
            className="w-12 h-8 animate-pulse"
        >
            Start!
        </Button>
    )
}
