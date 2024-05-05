import React from 'react'
import Button from '@mui/material/Button'

export interface ButtonProps {
    onClick: () => void
}

export const UserButton: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <Button
            style={{ textTransform: 'none' }}
            variant="outlined"
            onClick={onClick}
            className="w-12 h-8"
        >
            Start!
        </Button>
    )
}
