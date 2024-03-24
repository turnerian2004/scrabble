import React from 'react'

interface IIntroCard {
    message: string
}

export const IntroCard: React.FC<IIntroCard> = ({ message }) => {
    return (
        <>
            <h1 className="relative w-[400px] h-[200px] font-mono before:absolute before:inset-0 before:bg-white before:animate-typewriter">
                {message}
            </h1>
        </>
    )
}
