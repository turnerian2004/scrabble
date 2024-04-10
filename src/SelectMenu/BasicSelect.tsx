import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { UserActions } from '../Definitions'

export interface IBasicDispatch {
    type: UserActions
    payload: string
}

interface IBasicSelect {
    title: string
    options: string[]
    dispatch: React.Dispatch<IBasicDispatch>
    type: UserActions
}

export const BasicSelect: React.FC<IBasicSelect> = ({
    title,
    options,
    dispatch,
    type,
}) => {
    const [userSelection, setUserSelection] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setUserSelection(event.target.value as string)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {title}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSelection}
                    label="Age"
                    onChange={handleChange}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            value={option}
                            key={index}
                            onClick={() =>
                                dispatch({
                                    type: type,
                                    payload: option as string,
                                })
                            }
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
