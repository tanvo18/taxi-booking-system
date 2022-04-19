import { CarStatus } from '../enums/car-status'
import { Coordinate } from './coordinate'
import { Location } from '../interfaces/location'
import { calculateTimeUnit } from '../utils/utils'
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

  move = () => {
    if (this.status === CarStatus.BOOKED) {
      if (this.timeUnit === 1) {
        this.arriveDestination()
      } else {
        this.timeUnit--
      }
    }
  }

  arriveDestination = () => {
    this.startCoordinate = this.destCoordinate
    this.status = CarStatus.AVAILABLE
    this.timeUnit = 0
  }

  book = (location: Location) => {
    const { source, destination } = location
    this.destCoordinate = destination
    this.status = CarStatus.BOOKED
    this.timeUnit = calculateTimeUnit(this.startCoordinate, source) + calculateTimeUnit(source, destination)
  }
}
