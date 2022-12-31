# Sudoku Web Tool
### SocketIO Project #2
---

### Client
* Takes input from user
* Sends Puzzle to Server to be solved
* Gets Response from server that updates client puzzle

### Server
* Receives Input from Client
* Verifies Puzzle
* Returns a solved puzzle if possible

### Sudoku Solver
* Uses a simple backtracking algorithm that recursively tests each puzzle cell until solution or failure
* This solution could easily be sped up with a more advanced algorithm, but currently appears to run "fast enough" (<5ms)

CURRENTLY OFFLINE DUE TO HEROKU ISSUES
