import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { UserActions } from '../State/UserActions'

export interface IUserActionBasicMenu {
    type: UserActions
    payload: string
}

interface IBasicMenu {
    options: string[]
    title: string
    dispatch: React.Dispatch<IUserActionBasicMenu>
}

export const BasicMenu: React.FC<IBasicMenu> = ({
    options,
    title,
    dispatch,
}) => {
    const [anchorEl, setAnchorEl] =
        React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                style={{ textTransform: 'none' }}
            >
                {title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleClose
                            dispatch({
                                type: UserActions.SELECTCOMPUTERSKILLLEVEL,
                                payload: option,
                            })
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}
