import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { UserActions } from '../Definitions'

export interface IUserActionBasicSelect {
    type: UserActions
    payload: string
}

interface IBasicSelect {
    options: string[]
    title: string
    type: UserActions
    dispatch: React.Dispatch<IUserActionBasicSelect>
}

export const BasicSelect: React.FC<IBasicSelect> = ({
    options,
    title,
    type,
    dispatch,
}) => {
    const [userSelection, setUserSelection] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setUserSelection(event.target.value as string)
    }

    console.log('type: ', type)

    return (
        <div className="w-15 h-5">
            <Box
                sx={{
                    minWidth: 120,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        {title}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userSelection}
                        label={title}
                        onChange={handleChange}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                value={option}
                                key={index}
                                onClick={() => {
                                    dispatch({
                                        type: UserActions.SELECTCOMPUTERSKILLLEVEL,
                                        payload: option,
                                    })
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}
