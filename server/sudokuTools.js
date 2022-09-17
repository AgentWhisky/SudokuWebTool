const { performance } = require('perf_hooks');

const puzzleSize = 9;


// ***** Export Functions *****
function solve(puzzle, io, socketID) {

    // Solve Timer Start
    let solveStart = performance.now()

    // If the puzzle size is invalid, return
    if(!validSize(puzzle)) {
        return;
    }

    // If the puzzle is empty, it is unsolvable
    if(isEmpty(puzzle)) {
        return;
    }

    // Make a copy of the puzzle
    let puzzleCopy = copyPuzzle(puzzle);

    // Solve Copy of Puzzle
    solvePuzzle(puzzleCopy);


    // Get Indices of solved values
    let indices = getSolvedIndices(puzzle);


    // Solve Timer
    let solveTime = performance.now() - solveStart;
    console.log(`[Solve Time: ${solveTime}ms] `);


    // Emit Results back to client
    io.to(socketID).emit('solveResult', {
        puzzleData: puzzleCopy,
        solvedIndices: indices,
        time: solveTime
    });

}

// *** Export Functions ***
module.exports = {solve};






// ***** Private Functions *****

function getSolvedIndices(oldPuzzle) {
    let solvedList = [];

    for(let i = 0; i < puzzleSize; i++) {
        for(let j = 0; j < puzzleSize; j++) {
            if(!Number.isInteger(oldPuzzle[i][j])) {
                solvedList.push([i,j]);
            }
        }
    }
    return solvedList;
}

function isEmpty(puzzle) {
    for(let i = 0; i < puzzleSize; i++) {
        for(let j = 0; j < puzzleSize; j++) {
            if(Number.isInteger(puzzle[i][j])) {
                return false
            }
        }
    }
    return true;
}

// Function to check if the current puzzle is valid
function validPuzzle(puzzle) {
    return validRows(puzzle) && validColumns(puzzle) && validBlock(puzzle);

}

function solvePuzzle(puzzle) {
    let index = findNextEmpty(puzzle);

    // Is there are no empty cells
    if(index == null) {
        return validPuzzle(puzzle);
    }

    // If the puzzle given invalid, return
    if(!validPuzzle(puzzle)) {
        return false;
    }

    // Iterate 1-9 (valid numbers)
    for(let i = 1; i < 10; i++) {
        // Set puzzle value at index
        puzzle[index[0]][index[1]] = i;

        // If value is valid, return true
        if(solvePuzzle(puzzle)) {
            return true;
        }

        // If the value is invalid, clear puzzle index
        puzzle[index[0]][index[1]] = "";
    }

    // Bad Iteration
    return false;
}


// Function to find the next empty cell
function findNextEmpty(puzzle) {
    for(let i = 0; i < puzzleSize; i++) {
        for(let j = 0; j < puzzleSize; j++) {
            if(!Number.isInteger(puzzle[i][j])) {
                return [i, j];
            }
        }
    }
    return null;
}




// Function to validate Puzzle Size
function validSize(puzzle) {
    // Check Rows
    if(puzzle.length !== puzzleSize) {
        return false;
    }

    // Check Columns
    for(let i = 0; i < puzzleSize; i++) {
        if(puzzle[i].length !== puzzleSize) {
            return false;
        }
    }

    return true;
}
// Function to check if a given 9x9 puzzle is row valid
function validRows(puzzle) {
    let vals;
    let val;

    for(let i = 0; i < puzzleSize; i++) {

        vals = [];
        for(let j = 0; j < puzzleSize; j++) {
            val = puzzle[i][j]

            if(vals.includes(val)) {
                return false;
            }

            if(Number.isInteger(val)) {
                vals.push(val);
            }
        }

    }

    return true;
}
// Function to check if a given 9x9 puzzle is column valid
function validColumns(puzzle) {
    let vals;
    let val;

    for(let i = 0; i < puzzleSize; i++) {

        vals = [];
        for(let j = 0; j < puzzleSize; j++) {
            val = puzzle[j][i];


            if(vals.includes(val)) {
                return false;
            }

            if(Number.isInteger(val)) {
                vals.push(val);
            }
        }

    }
    return true;
}

// Function to check if a given 9x9 puzzle is block valid
function validBlock(puzzle) {
    let vals;

    let val;

    // Iterate through each block
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {

            let init_i = (i*3);
            let init_j = (j*3);

            vals = [];

            // Iterate the cells in the block
            for(let a = 0; a < 3; a++) {
                for(let b = 0; b < 3; b++) {

                    val = puzzle[a + init_i][b + init_j];

                    if(vals.includes(val)) {
                        return false;
                    }

                    if(Number.isInteger(val)) {
                        vals.push(val);
                    }
                }
            }
        }
    }
    return true;
}

function copyPuzzle(puzzle) {
    let newPuzzle = new Array(puzzleSize);

    for(let i = 0; i < puzzleSize; i++) {
        newPuzzle[i] = puzzle[i].slice();
    }

    return newPuzzle;
}

function printPuzzle(puzzle) {
    console.log("*** Print Puzzle ***");
    let lineStr;
    for(let i = 0; i < puzzleSize; i++) {
        lineStr = "|";
        for(let j = 0; j < puzzleSize; j++) {
            lineStr += puzzle[i][j];

            if(j < puzzleSize-1) {
                lineStr += ", ";
            }
        }
        lineStr += "|";

        console.log(lineStr)
    }
}



