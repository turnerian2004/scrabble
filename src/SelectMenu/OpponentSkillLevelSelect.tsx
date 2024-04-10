import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
    UserActions,
    freeDictionaryApiResponse,
} from '../Definitions'
import axios from 'axios'
import { getRecommendedWords } from '../Utils/getRecommendedWords'
import { ILetter } from '../Letters/Letters'
import { WordEntry } from '../assests/words'

export interface IOpponentDispatch {
    type: UserActions
    payload: [freeDictionaryApiResponse, WordEntry[], string]
}

interface IOpponentSelect {
    options: string[]
    title: string
    dispatch: React.Dispatch<IOpponentDispatch>
    playerLetters: ILetter[]
}

export const OppenentSkillLevelSelect: React.FC<IOpponentSelect> = ({
    options,
    title,
    dispatch,
    playerLetters,
}) => {
    const [userSelection, setUserSelection] = React.useState('')

    const handleClick = async (event: SelectChangeEvent) => {
        setUserSelection(event.target.value as string)
        const computerSkillLevel = event.target.value as string

        const initialWordRecommendations = getRecommendedWords(
            playerLetters,
            computerSkillLevel
        )

        const invalidWords: WordEntry[] = []

        let isValidWord = false

        for (
            let i = 0;
            i < initialWordRecommendations.length &&
            isValidWord === false;
            i++
        ) {
            const topWordRecommendation =
                initialWordRecommendations[i]

            try {
                const response = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${topWordRecommendation.word}`
                )
                const wordData = response.data[0]
                isValidWord = true

                const recommendedWords =
                    initialWordRecommendations.filter(
                        (recommendedWord) =>
                            !invalidWords.includes(recommendedWord)
                    )

                dispatch({
                    type: UserActions.SELECTCOMPUTERSKILLLEVEL,
                    payload: [
                        wordData as freeDictionaryApiResponse,
                        recommendedWords,
                        computerSkillLevel,
                    ],
                })
            } catch (error) {
                console.log(error)
                invalidWords.push(topWordRecommendation)
            }
        }
    }

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
                        onChange={handleClick}
                    >
                        {options.map((option, index) => (
                            <MenuItem value={option} key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}
