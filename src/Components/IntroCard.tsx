import React from 'react'

interface IIntroCard {
    message: string
}

export const IntroCard: React.FC<IIntroCard> = ({ message }) => {
    return (
        <>
            <h1 className="relative h-[200px] w-[400px] font-mono before:absolute before:inset-0 before:animate-typewriter before:bg-white">
                {message}
            </h1>
        </>
    )
}
