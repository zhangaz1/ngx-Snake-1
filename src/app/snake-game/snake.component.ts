import {Component, HostListener, OnInit} from '@angular/core';
import {RandomNumberService} from './utility/random-number.service';
import {ReplaySubject, timer} from 'rxjs';
import {Snake} from './entities/snake';
import {Fruit} from './fruit/fruit';
import {Grid} from './constants/grid';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  // Grid
  public columns = new Array(Grid.COLUMNS);
  public rows = new Array(Grid.ROWS);

  public score = 0;

  // Time of snake's movement
  private movement$ = timer(0, 500);
  private snake: Snake;
  private fruit: Fruit;

  private gameOver$ = new ReplaySubject(1);

  constructor(private randomNumberService: RandomNumberService) {

    this.snake = new Snake(5, 5);
    this.newFruit();


  }

  ngOnInit(): void {

    this.movement$.pipe(
      map(() => this.snake.doMove()),
      takeUntil(this.gameOver$)
    )
      .subscribe(
        data => {

          // Dopo che eseguo il movimento

          // Controllo se ho mangiato il frutto
          if (this.checkIfEatFruit()) {
            this.newFruit();
            this.score += 1;
          } else {
            this.snake.cutTail();
          }

          if (this.snake.checkGameOver()) {
            alert('Game Over');
            this.gameOver$.next(true);
          }
        }
      );
  }

  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    this.snake.changeDirection(e.keyCode);
  }

  public colorGrid(x: number, y: number) {

    if (this.snake.coordinateIsHead(x, y)) {
      return 'black';
    }

    if (this.snake.coordinateIsBody(x, y)) {
      return 'blue';
    }

    if (this.fruit.coordinateIsFruit(x, y)) {
      return 'orange';
    }
  }

  private newFruit() {

    const x = this.randomNumberService.generateRandomNumber(Grid.COLUMNS);
    const y = this.randomNumberService.generateRandomNumber(Grid.ROWS);

    this.fruit = new Fruit(x, y);
  }

  private eatFruit() {


  }

  private checkIfEatFruit(): boolean {
    return this.snake.coordinateIsHead(this.fruit.x, this.fruit.y);
  }


}
