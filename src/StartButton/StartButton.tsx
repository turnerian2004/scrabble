import React from 'react'
import Button from '@mui/material/Button'
import {
    UserActions,
    freeDictionaryApiResponse,
} from '../Definitions'
import axios from 'axios'

export interface IStartAction {
    type: UserActions
    payload: freeDictionaryApiResponse
}

interface IStartButtonProps {
    dispatch: React.Dispatch<IStartAction>
}

export const StartButton: React.FC<IStartButtonProps> = ({
    dispatch,
}) => {
    const handleClick = async () => {
        try {
            const response = await axios.get(
                'https://api.dictionaryapi.dev/api/v2/entries/en/hello'
            )
            const wordData = response.data[0]

            dispatch({
                type: UserActions.STARTGAME,
                payload: wordData as freeDictionaryApiResponse,
            })
        } catch (error) {
            console.log(error)
        }
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
