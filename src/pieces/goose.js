import Piece from './piece.js';
import { isSameDiagonal, isSameRow } from '../helpers'

export default class Goose extends Piece {
  constructor(player, position) {
    super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/0/01/GoosePieceSmall.svg" : "https://upload.wikimedia.org/wikipedia/commons/0/01/GoosePieceSmall.svg"));
    this.position = position
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
