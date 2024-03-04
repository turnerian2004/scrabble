import { useReducer } from 'react'

import './App.css'
// import { initializeLetterObjects } from './Letters/Letters'
import { IState, initialState } from './State/initialState'

function reducer(state: IState, action: string) {
    console.log(action)

    return state
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state)
    console.log(dispatch)

    return <div>Coming Soon!</div>
}

export default App
