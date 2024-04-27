import './App.css'
import { ScrabbleProvider } from './Context/ScrabbleContext'
import { initialState } from './Context/initialState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { StartPage } from './Pages/startPage'
import { VisitorPage } from './Pages/vistorPage'

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
