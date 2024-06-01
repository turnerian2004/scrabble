import React from 'react'

export interface ScoreDisplayProps {
    playerScore: number
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
    playerScore,
}) => {
    return (
        <div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-[#1977d3] text-center text-4xl">
            {playerScore}
        </div>
    )
}
