import { CarStatus } from '../enums/car-status'
import { Coordinate } from './coordinate'

export class Car {
  id: number
  startCoordinate: Coordinate
  destCoordinate: Coordinate
  status: CarStatus
  timeUnit: number

  constructor(id: number) {
    this.id = id
    this.startCoordinate = new Coordinate(0, 0)
    this.destCoordinate = new Coordinate(0, 0)
    this.status = CarStatus.AVAILABLE
    this.timeUnit = 0
  }

  move = () => {
    if (this.timeUnit > 0) {
      this.timeUnit--
    }
  }

  arriveDestination = () => {
    this.status = CarStatus.AVAILABLE
    this.startCoordinate = this.destCoordinate
    this.timeUnit = 0
  }

  assignedLocation = (destination: Coordinate) => {
    this.destCoordinate = destination
  }
}
