import { ScrabbleProvider } from './Context/ScrabbleContext'
import { initialState } from './Context/InitialState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { WelcomePage } from './Pages/WelcomePage'
import { VisitorPage } from './Pages/SelectOpponentPage'

function App() {
    return (
        <>
            <ScrabbleProvider initialState={initialState}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={WelcomePage} />
                        <Route
                            path="/visitor"
                            Component={VisitorPage}
                        />
                    </Routes>
                </BrowserRouter>
            </ScrabbleProvider>
        </>
    )
}

export default App
