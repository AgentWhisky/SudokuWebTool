'use strict';

const e = React.createElement;


class Client extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            puzzle: getEmptyPuzzle(),
            solvedIndices: [],
            solveTime: 0,
            solved: false
        };

        // SocketIO
        this.socket = io();
        this.socketIOEvents();

        // * Bind Events *
        this.onSudokuPuzzleChange = this.onSudokuPuzzleChange.bind(this);
        this.onSolveButton = this.onSolveButton.bind(this);
        this.onClearButton = this.onClearButton.bind(this);



    }
    // *** SocketIO Events ***
    socketIOEvents() {
        this.socket.on('solveResult', (data) => {
            this.setState({
                solvedIndices: data.solvedIndices,
                solveTime: data.time,
                solved: true
            });
            this.updatePuzzle(data.puzzleData);



        });
    }

    // *** React Events ***

    // Event to Modify the current puzzle on cell interaction
    onSudokuPuzzleChange(event) {
        event.preventDefault();

        let value = event.target.value;

        // Block Invalid Inputs
        if(isNaN(value) || value === "0") {
            event.target.value = "";
        }
        // Set Numeric [1-9] values on the puzzle
        else {
            let indices = event.target.id.substring(cellStr.length);



            let i = parseInt(indices.substring(0, 1));
            let j = parseInt(indices.substring(1));


            let newPuzzle = this.state.puzzle;
            newPuzzle[i][j] = parseInt(event.target.value);

            this.setState({
                puzzle: newPuzzle
            });
        }
    }

    // Function for Solve Button Event
    onSolveButton(event) {
        this.socket.emit('solve', this.state.puzzle);
    }

    // Function for Clear Button Event
    onClearButton() {
        // Set Puzzle as Empty
        this.updatePuzzle(getEmptyPuzzle());
        // Update Solved Data
        this.setState({
            solvedIndices: [],
            solveTime: 0,
            solved: false
        });


    }

    // Function to update client puzzle with a given puzzle
    updatePuzzle(newPuzzle) {
        this.setState({
            puzzle: newPuzzle
        });

        for(let i = 0; i < puzzleSize; i++) {
            for(let j = 0; j < puzzleSize; j++) {
                document.getElementById(cellStr + i + j).value = newPuzzle[i][j];
            }
        }
    }



    // *** Build Components ***

    // Build Puzzle Input
    buildSudokuPuzzle() {
        let puzzle = [];
        let idCount = 0;
        let div;

        // Rows
        for(let i = 0; i < puzzleSize; i++) {
            // Columns
            for(let j = 0; j < puzzleSize; j++) {


                // * Borders *
                div = <div className="sudoku-cell">
                    <input type="text" id={cellStr + `${i}${j}`} maxLength="1" pattern="^[0-9]" onChange={this.onSudokuPuzzleChange}/>
                </div>

                puzzle.push(div);

                idCount++;

            }
            puzzle.push(<br/>);
        }

        let returnDiv;

        if(this.state.solved) {
            returnDiv = <div className="sudoku-puzzle">
                {puzzle}
                <button id={solveButtonID} type="button" onClick={this.onSolveButton}>Solve</button>
                <button id={clearButtonID} type="button" onClick={this.onClearButton}>Clear</button>
            </div>
        }
        else {
            returnDiv = <div className="sudoku-puzzle">
                {puzzle}
                <button id={solveButtonID} type="button" onClick={this.onSolveButton}>Solve</button>
                <button id={clearButtonID} type="button" onClick={this.onClearButton}>Clear</button>
            </div>
        }


        return(returnDiv);
    }




    // *** Page Render Functions ***
    renderSudoku() {
        return(this.buildSudokuPuzzle());
    }



    // *** Main Render Function ***
    render() {
        return (
            <div>
                {this.renderSudoku()}
            </div>
        );
    }
}





// *** Render App ***
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Client));