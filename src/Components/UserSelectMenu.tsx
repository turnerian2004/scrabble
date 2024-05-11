import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export interface UserSelectMenuProps {
    title: string
    options: string[]
    onClick: (userSelection: string) => void
}

export const UserSelectMenu: React.FC<UserSelectMenuProps> = ({
    title,
    options,
    onClick,
}) => {
    const [userSelection, setUserSelection] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setUserSelection(event.target.value)
        onClick(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                    {title}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={userSelection}
                    onChange={handleChange}
                    autoWidth
                    label={title}
                >
                    {options.map((option, i) => (
                        <MenuItem value={option} key={i}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
