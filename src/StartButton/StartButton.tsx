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
        <Button
            style={{ textTransform: 'none' }}
            variant="outlined"
            onClick={() => {
                dispatch({ type: UserActions.STARTGAME })
            }}
        >
            Start!
        </Button>
    )
}
