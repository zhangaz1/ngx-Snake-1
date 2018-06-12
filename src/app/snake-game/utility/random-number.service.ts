import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() {
  }

  public generateRandomNumber(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
