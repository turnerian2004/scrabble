import Button from '@mui/material/Button'

import { UserActions } from '../State/UserActions'

export interface IUserAction {
    // TODO: move to better location
    type: UserActions
}

interface IStartButton {
    dispatch: React.Dispatch<IUserAction>
}

export const StartButton: React.FC<IStartButton> = ({ dispatch }) => {
    return (
        <Button
            variant="outlined"
            onClick={() => {
                dispatch({ type: UserActions.STARTGAME })
            }}
        >
            Start!
        </Button>
    )
}
