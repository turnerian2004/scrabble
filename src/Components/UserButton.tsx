import React from 'react'
import Button from '@mui/material/Button'

export interface ButtonProps {
    onClick: () => void
    title: string
}

export const UserButton: React.FC<ButtonProps> = ({
    onClick,
    title,
}) => {
    return (
        <Button
            variant="outlined"
            onClick={onClick}
            className="h-12 w-32 normal-case">
            {title}
        </Button>
    )
}
