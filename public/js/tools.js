// *** Component IDs ***
const solveButtonID = "solve-id";
const clearButtonID = "clear-id";

const cellStr = "cellInput-";



// Default Puzzle Size
const puzzleSize = 9;



// i -> Rows
// j -> Columns

// Function to generate an empty 2D puzzle array
function getEmptyPuzzle() {
    let puzzle = new Array(puzzleSize);


    for(let i = 0; i < puzzleSize; i++) {
        puzzle[i] = new Array(puzzleSize);

        for(let j = 0; j < puzzleSize; j++) {
            puzzle[i][j] = "";
        }
    }

    return puzzle;
}

// Function to make a copy of given 2D puzzle array
function copyPuzzle(puzzle) {
    let newPuzzle = new Array(puzzleSize);

    for(let i = 0; i < puzzleSize; i++) {
        newPuzzle[i] = puzzle[i].slice();
    }

    return newPuzzle;
}