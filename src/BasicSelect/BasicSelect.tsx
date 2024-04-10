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

export interface IUserActionBasicSelect {
    type: UserActions
    payload: [
        freeDictionaryApiResponse,
        WordEntry[],
        string,
        WordEntry[],
    ]
}

interface IBasicSelect {
    options: string[]
    title: string
    dispatch: React.Dispatch<IUserActionBasicSelect>
    playerLetters: ILetter[]
}

export const BasicSelect: React.FC<IBasicSelect> = ({
    options,
    title,
    dispatch,
    playerLetters,
}) => {
    const [userSelection, setUserSelection] = React.useState('')

    const handleClick = async (event: SelectChangeEvent) => {
        setUserSelection(event.target.value as string)
        const computerSkillLevel = event.target.value as string

        const wordRecommendations = getRecommendedWords(
            playerLetters,
            computerSkillLevel
        )

        const invalidWords: WordEntry[] = []

        let isValidWord = false

        for (
            let i = 0;
            i < wordRecommendations.length && isValidWord === false;
            i++
        ) {
            const topWordRecommendation = wordRecommendations[i]

            try {
                const response = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${topWordRecommendation.word}`
                )
                const wordData = response.data[0]
                isValidWord = true

                dispatch({
                    type: UserActions.SELECTCOMPUTERSKILLLEVEL,
                    payload: [
                        wordData as freeDictionaryApiResponse,
                        wordRecommendations,
                        computerSkillLevel,
                        invalidWords,
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
