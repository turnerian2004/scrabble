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
            style={{
                textTransform: 'none',
                minWidth: 120,
                minHeight: 50,
            }}
            variant="outlined"
            onClick={onClick}
            className="h-8 w-12"
        >
            {title}
        </Button>
    )
}
