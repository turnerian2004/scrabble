import Button from '@mui/material/Button'

import { UserActions } from '../State/UserActions'

export interface IUserAction {
    type: UserActions
}

interface IStartButton {
    dispatch: React.Dispatch<IUserAction>
}

export const StartButton: React.FC<IStartButton> = ({ dispatch }) => {
    return (
        <>
            <Button
                style={{ textTransform: 'none' }}
                variant="outlined"
                onClick={() => {
                    dispatch({ type: UserActions.STARTGAME })
                }}
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
        </>
    )
}
