import { ScrabbleProvider } from './Context/gameReducer'
import { initialState } from './Context/InitialState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { WelcomePage } from './Pages/WelcomePage'
import { VisitorPage } from './Pages/SelectOpponentPage'
import { GamePage } from './Pages/GamePage'

function App() {
    return (
        <>
            <ScrabbleProvider initialState={initialState}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" Component={WelcomePage} />
                            <Route
                                path="/visitor"
                                Component={VisitorPage}
                            />
                            <Route
                                path="/game"
                                Component={GamePage}
                            />
                        </Routes>
                    </BrowserRouter>
                </DndProvider>
            </ScrabbleProvider>
        </>
    )
}

export default App
