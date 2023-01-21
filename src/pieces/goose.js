import Piece from './piece.js';
import { isSameDiagonal, isSameRow } from '../helpers'

export default class Goose extends Piece {
  constructor(player, position, color) {
    
    const gooseColors = {
      Black: "pfx.svg",
      Darkgreen: "ph1.svg",
      Orange: "phr.svg",
      Darkblue: "phW.svg",
      Purple: "pgY.svg",
      Blue: "phX.svg",
      Teal: "phL.svg",
      Green: "phM.svg",
      Yellow: "pgt.svg",
      Red: "pgu.svg"
    }
    console.log(gooseColors[color]);
    super(player, "https://svgshare.com/i/" + gooseColors[color]);
    this.position = position;
    this.color = color;
  }

  isMovePossible(src, dest) {
    return ((src - 9 === dest && isSameDiagonal(src, dest)) ||
      src - 8 === dest ||
      (src - 7 === dest && isSameDiagonal(src, dest)) ||
      (src + 1 === dest && isSameRow(src, dest)) ||
      (src + 9 === dest && isSameDiagonal(src, dest)) ||
      src + 8 === dest ||
      (src + 7 === dest && isSameDiagonal(src, dest)) ||
      (src - 1 === dest && isSameRow(src, dest)))
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest) {
    return [];
  }

  getPosition() {
    return this.state.position;
  }

  changePosition(position) {
    this.position = position;
  }
}
