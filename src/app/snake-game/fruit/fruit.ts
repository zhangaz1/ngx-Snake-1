import {Grid} from '../constants/grid';

export class Fruit {

  public x: number;
  public y: number;
  public color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }


  /**
   * Check that the coordinate is fruit
   *
   * @param {number} x The abscissa of the coordinate
   *
   * @param {number} y The ordinate of the coordinate
   *
   * @return {boolean} True if the coordinate is fruit
   */
  public coordinateIsFruit(x: number, y: number): boolean {

    if (this.x === x && this.y === y) {
      return true;
    }
    return false;
  }


}
