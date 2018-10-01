import React from "react";
import {Board} from "./board"


class Game extends React.Component {
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber:history.length,
        xIsNext: !this.state.xIsNext,
     });
      }
      jumpTo(step) {
          this.setState({
              stepNumber: step,
              xIsNext: (step % 2) === 0,
          });
      }
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(64).fill(null),
            }],
            stepNumber: 0,
            xIsNext:true,
        };
    }
  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = 
      calculateWinner(current.squares);

      const moves = history.map((step, move) =>{
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key ={move}>
                    <button onClick={() =>
                    this.jumpTo(move)}>{desc}</button>
                </li>
            )
      })
      let status;
      if (winner) {
          status = 'Winner: ' + winner;
      } else {
          status =  'Next player: ' +
          (this.state.xIsNext ? 'X' : 'O')
      }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares = {current.squares}
          onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30, 31],
        [32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47],
        [48, 49, 50, 51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60, 61, 62, 63],
        [0, 8, 16, 24, 32, 40, 48, 56],
        [1, 9, 17, 25, 33, 41, 49, 57],
        [2, 10, 18, 26, 34, 42, 50, 58],
        [3, 11, 19, 27, 35, 43, 51, 59],
        [4, 12, 20, 28, 36, 44, 52, 60],
        [5, 13, 21, 29, 37, 45, 53, 61],
        [6, 14, 22, 30, 38, 46, 54, 62],
        [7, 15, 23, 31, 39, 47, 55, 63],
        [0, 9, 18, 27, 36, 45, 54, 63],
        [7, 14, 21, 28, 35, 42, 49, 56]
    ];
    for (let i = 0; i <lines.length; i++) {
        const [a, b, c, d, e, f, g, h] = lines [i];
        if (squares[a] && squares[a] === squares[b] 
            && squares[a] === squares[c] && squares [c] === squares [d] && squares [d] === squares [e] && squares [e] === 
            squares [f] && squares [f] === squares [g] && squares [g] === squares [h]){
            return squares[a];
        }
    }
    return null;
}
export {Game}

// ========================================