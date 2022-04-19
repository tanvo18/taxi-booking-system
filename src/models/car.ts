import { CarStatus } from '../enums/car-status'
import { Coordinate } from './coordinate'

export class Car {
  id: number
  startCoordinate: Coordinate
  destCoordinate: Coordinate
  status: CarStatus
  timeUnit: number

  constructor(id: number, startCoordinate = new Coordinate(0, 0), destCoordinate = new Coordinate(0, 0)) {
    this.id = id
    this.startCoordinate = startCoordinate
    this.destCoordinate = destCoordinate
    this.status = CarStatus.AVAILABLE
    this.timeUnit = 0
  }
}
