import {Coordinate} from './coordinate';
import {ArrowKey} from '../constants/arrow-key.enum';
import {Grid} from '../constants/grid';

export class Snake {

  public blockPositions = new Array<{ x: number, y: number }>(); // TODO: Implementare classe Coordinate
  public direction: ArrowKey;

  constructor(x: number, y: number) {
    this.direction = ArrowKey.ARROW_UP;
    this.initSnakePositions(x, y);
  }


  public doMove(): void {


    switch (this.direction) {
      case ArrowKey.ARROW_LEFT:
        this.moveLeft();
        break;
      case ArrowKey.ARROW_UP:
        this.moveUp();
        break;
      case ArrowKey.ARROW_DOWN:
        this.moveDown();
        break;
      case ArrowKey.ARROW_RIGHT:
        this.moveRight();
        break;
    }
  }

  public cutTail(): void {
    this.blockPositions.splice(-1, 1);
  }


  /**
   * Change the direction of the snake
   *
   * @param {ArrowKey} key KeyCode of the input Keyboard
   */
  public changeDirection(key: ArrowKey): void {
    switch (this.direction) {
      case ArrowKey.ARROW_RIGHT:
        if (key === ArrowKey.ARROW_LEFT) {
          return;
        }
        break;
      case ArrowKey.ARROW_DOWN:
        if (key === ArrowKey.ARROW_UP) {
          return;
        }
        break;
      case ArrowKey.ARROW_UP:
        if (key === ArrowKey.ARROW_DOWN) {
          return;
        }
        break;
      case ArrowKey.ARROW_LEFT:
        if (key === ArrowKey.ARROW_RIGHT) {
          return;
        }
        break;
    }
    this.direction = key;
  }


  /**
   * Check if the coordinate is the head of the snake
   *
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  public coordinateIsHead(x: number, y: number): boolean {
    if (this.blockPositions[0].x === x && this.blockPositions[0].y === y) {
      return true;
    }
    return false;
  }


  /**
   * Check if the coordinate is part of the snake's body
   *
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  public coordinateIsBody(x: number, y: number): boolean {
    let coordinate;

    for (let i = 1; i < this.blockPositions.length; i++) {
      coordinate = this.blockPositions[i];
      if (coordinate.x === x && coordinate.y === y) {
        return true;
      }
    }
    return false;
  }


  /**
   * Check if game is over
   *
   * @return {boolean} True if game is over
   */
  public checkGameOver(): boolean {
    if (this.checkBorder() || this.checkMySelf()) {
      return true;
    }
    return false;
  }


  //#region Moves
  private moveUp() {
    const oldHeader = this.blockPositions[0];
    this.blockPositions.unshift({x: oldHeader.x, y: oldHeader.y - 1});
  }

  private moveDown() {
    const oldHeader = this.blockPositions[0];
    this.blockPositions.unshift({x: oldHeader.x, y: oldHeader.y + 1});
  }

  private moveLeft() {
    const oldHeader = this.blockPositions[0];
    this.blockPositions.unshift({x: oldHeader.x - 1, y: oldHeader.y});
  }

  private moveRight() {
    const oldHeader = this.blockPositions[0];
    this.blockPositions.unshift({x: oldHeader.x + 1, y: oldHeader.y});
  }

  //#endregion


  private checkBorder(): boolean {
    const head = this.blockPositions[0];

    if (
      head.x === -1 ||
      head.x === Grid.ROWS ||
      head.y === -1 ||
      head.y === Grid.COLUMNS
    ) {
      return true;
    }

    return false;
  }

  private checkMySelf(): boolean {
    const head = this.blockPositions[0];
    let bodyPart;

    for (let i = 1; i < this.blockPositions.length; i++) {
      bodyPart = this.blockPositions[i];
      if (head.x === bodyPart.x && head.y === bodyPart.y) {
        return true;
      }
    }
    return false;
  }

  private initSnakePositions(x: number, y: number) {

    this.blockPositions.push({x: x, y: y});
    this.blockPositions.push({x: x, y: y + 1});
    this.blockPositions.push({x: x, y: y + 2});
  }
}
