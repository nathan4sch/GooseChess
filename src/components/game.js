import React from 'react';

import '../index.css';
import './game.css';
import Board from './board.js';
import King from '../pieces/king';
import Queen from '../pieces/queen';
import Pawn from '../pieces/pawn';
import Goose from '../pieces/goose';
import FallenSoldierBlock from './fallen-soldier-block.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      geese: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white'
    }
    
    // setting the intial board to include a goose
    let randomValue = Math.floor(Math.random() * (39 - 24 + 1)) + 24;
    let initialGoose = new Goose(3, randomValue);
    this.state.squares[randomValue] = initialGoose;
    console.log("Initial goose starting value: " + randomValue);
    this.state.geese.push(initialGoose);
    
  }



  handleClick(i) {
    const squares = [...this.state.squares];

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        })
      }
      return
    }

    squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
    }
    else {

      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
      const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
      const isCastle = squares[this.state.sourceSelection].constructor.name === "King" && Math.abs(this.state.sourceSelection - i) === 2;
      const canLeftCastle = (this.state.turn === "white" && squares[56] !== null && squares[56].constructor.name === "Rook" && !squares[56].moved && this.isMoveLegal(squares[56].getSrcToDestPath(56, 59))) ||
        (this.state.turn === "black" && squares[0] !== null && squares[0].constructor.name === "Rook" && !squares[0].moved && this.isMoveLegal(squares[0].getSrcToDestPath(0, 3)));
      const canRightCastle = (this.state.turn === "white" && squares[63] !== null && squares[63].constructor.name === "Rook" && !squares[63].moved && this.isMoveLegal(squares[63].getSrcToDestPath(63, 61))) ||
      (this.state.turn === "black" && squares[7] !== null && squares[7].constructor.name === "Rook" && !squares[7].moved && this.isMoveLegal(squares[7].getSrcToDestPath(7, 5)))
      const isMoveLegal = this.isMoveLegal(srcToDestPath);

      if (isMovePossible && isMoveLegal && (squares[i] === null || squares[i].constructor.name !== "Goose") && (!isCastle || (this.state.sourceSelection - i === 2 && canLeftCastle) || (this.state.sourceSelection - i === -2 && canRightCastle))) {
        if (squares[i] !== null) {
          if (squares[i].player === 1) {
            whiteFallenSoldiers.push(squares[i]);
            if (squares[i].constructor.name === "King") {
              console.log("endgame black wins")
              alert("Black wins!")
            }          
          }
          else {
            blackFallenSoldiers.push(squares[i]);
            if (squares[i].constructor.name === "King") {
              console.log("endgame white wins")
              alert("White wins!")
            }
          }
        }
        if (squares[this.state.sourceSelection].constructor.name === "King" || squares[this.state.sourceSelection].constructor.name === "Rook") {
          console.log(squares[this.state.sourceSelection].moved)
          squares[this.state.sourceSelection].moved = true
        }
        if (isCastle) {
          if (this.state.sourceSelection - i > 0) {
            if (this.state.turn === "white") {
              squares[59] = squares[56]
              squares[56] = null
              squares[59].moved = true
            }
            else {
              squares[3] = squares[0]
              squares[0] = null
              squares[3].moved = true
            }
          }
          else {
            if (this.state.turn === "white") {
              squares[63] = squares[61]
              squares[63] = null
              squares[61].moved = true
            }
            else {
              squares[5] = squares[0]
              squares[0] = null
              squares[3].moved = true
            }
          }
        }
        
        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = null;
        

        //const isCheckMe = this.isCheckForPlayer(squares, this.state.player)
        const isCheckMe = false;

        if (isCheckMe) {
          this.setState(oldState => ({
            status: "Wrong selection. Choose valid source and destination again. Now you have a check!",
            sourceSelection: -1,
          }))
        } else {
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';

          //Pawn Premotion
          if(squares[i].constructor.name == "Pawn" ){
            console.log("PJ " + i);
            if(squares[i] === 0 || squares[i] === 1 ||
               squares[i] === 2 || squares[i] === 3 ||
               squares[i] === 4 || squares[i] === 5 ||
               squares[i] === 6 || squares[i] === 7 ) {
              whiteFallenSoldiers.push(squares[i]);
              squares[i] = new Queen(1);
                  }
            }
            else{
            if(squares[i] == 56 || squares[i] == 57 ||
                squares[i] == 58 || squares[i] == 59 ||
                squares[i] == 60 || squares[i] == 61 ||
                squares[i] == 62 || squares[i] == 63 ){
              blackFallenSoldiers.push(squares[i]);
              squares[i] = new Queen(2);
            } 
          }
        
          this.setState(oldState => ({
            sourceSelection: -1,
            squares,
            whiteFallenSoldiers: [...oldState.whiteFallenSoldiers, ...whiteFallenSoldiers],
            blackFallenSoldiers: [...oldState.blackFallenSoldiers, ...blackFallenSoldiers],
            player,
            status: '',
            turn
          }));
        }

        //goosemove
        for(let i = 0; i < this.state.geese.length; i++) {
          let position = this.state.geese[i].position;
          let possiblePositions = [];
          if (squares[position - 9] === null) {
            possiblePositions.push(position - 9);
          }
          if (squares[position - 8] === null) {
            possiblePositions.push(position - 8);
          }
          if (squares[position - 7] === null) {
            possiblePositions.push(position - 7);
          }
          if (squares[position + 1] === null) {
            possiblePositions.push(position + 1);
          }
          if (squares[position + 9] === null) {
            possiblePositions.push(position + 9);
          }
          if (squares[position + 8] === null) {
            possiblePositions.push(position + 8);
          }
          if (squares[position + 7] === null) {
            possiblePositions.push(position + 7);
          }
          if (squares[position - 1] === null) {
            possiblePositions.push(position - 1);
          }
          console.log(position);
          console.log(possiblePositions);
          let newPositionIndex = Math.floor(Math.random() * (possiblePositions.length));
          
          console.log(newPositionIndex);
          console.log(possiblePositions[newPositionIndex]);

          squares[possiblePositions[newPositionIndex]] = squares[position];
          squares[position] = null;
          //this.Goose.position = possiblePositions[newPositionIndex];
          this.state.geese[i].changePosition(possiblePositions[newPositionIndex]);
        }

      }
      else {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
    }
  }

  getKingPosition(squares, player) {
    return squares.reduce((acc, curr, i) =>
      acc || //King may be only one, if we had found it, returned his position
      ((curr //current squre mustn't be a null
        && (curr.getPlayer() === player)) //we are looking for aspecial king 
        && (curr instanceof King)
        && i), // returned position if all conditions are completed
      null)
  }

  isCheckForPlayer(squares, player) {
    const opponent = player === 1 ? 2 : 1
    const playersKingPosition = this.getKingPosition(squares, player)
    const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
    return squares.reduce((acc, curr, idx) =>
      acc ||
      (curr &&
        (curr.getPlayer() === opponent) &&
        canPieceKillPlayersKing(curr, idx)
        && true),
      false)
  }

    /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}               
   */
    isMoveLegal(srcToDestPath){
    let isLegal = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(this.state.squares[srcToDestPath[i]] !== null){
        isLegal = false;
      }
    }
    return isLegal;
  }

  render() {

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

            </div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">

              {
                <FallenSoldierBlock
                whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                blackFallenSoldiers={this.state.blackFallenSoldiers}
              />
              }
            </div>

          </div>
        </div>
      </div>


    );
  }
}

