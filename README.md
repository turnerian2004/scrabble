# Build instructions

1. Clone the project
2. Go to the root directory
3. Run `npm install`
4. Run `npm run dev`
5. Go to the specified local host, likely `http://127.0.0.1:5173/`

# Test

To run the tests: `npm test`
To see the test code coverage: `npx jest --coverage`

# Raison d'etre

I kept losing to the computer while playing this [version](https://playscrabble.com/play/ai), so I built my own.

# Play online

Play my version [here](https://turnerian2004.github.io/scrabble/)

# Coding Terms

playerLetters
computerLetters
personLetters

In the code base, computer refers to the computer opponent, person refers to the human opponent, and player refers to an instance that can be either the computer or the person.
