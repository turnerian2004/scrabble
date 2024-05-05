import { ScrabbleProvider } from './Context/ScrabbleContext'
import { initialState } from './Context/initialState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { StartPage } from './Pages/start'
import { VisitorPage } from './Pages/selectOpponent'

function App() {
    return (
        <>
            <ScrabbleProvider initialState={initialState}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={StartPage} />
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
