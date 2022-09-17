// *** Component IDs ***
const solveButtonID = "solve-id";
const clearButtonID = "clear-id";




const puzzleSize = 9;
const cellStr = "cellInput-";


// i -> Rows
// j -> Columns
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

function copyPuzzle(puzzle) {
    let newPuzzle = new Array(puzzleSize);

    for(let i = 0; i < puzzleSize; i++) {
        newPuzzle[i] = puzzle[i].slice();
    }

    return newPuzzle;
}