import { Car } from '../models/car'
import { Location } from '../interfaces/location'
import { CarStatus } from '../enums/car-status'
import { calculateTimeUnit } from '../utils/utils'
export class CarService {
  cars: Car[]

  constructor() {
    this.cars = this.initializeCars(3)
  }

  initializeCars = (quantity: number): Car[] => {
    const cars: Car[] = []

    for (let i = 1; i <= quantity; i++) {
      cars.push(new Car(i))
    }

    return cars
  }

  getCars = (): Car[] => {
    return this.cars
  }

  book = (car: Car, location: Location): Car => {
    const { source, destination } = location

    car.destCoordinate = destination
    car.status = CarStatus.BOOKED
    car.timeUnit = calculateTimeUnit(car.startCoordinate, source) + calculateTimeUnit(source, destination)

    return car
  }

  findNearestCar = (cars: Car[], location: Location): Car | null => {
    const availableCars = cars.filter(car => car.status === CarStatus.AVAILABLE)

    if (availableCars.length === 0) {
      return null
    }

    // Sorting follow id
    availableCars.sort((car1, car2) => car1.id - car2.id)

    // Finding the nearestCar
    let nearestCar = availableCars.reduce((prev, current) => calculateTimeUnit(prev.startCoordinate, location.source) <= calculateTimeUnit(current.startCoordinate, location.source) ? prev : current)
    nearestCar = this.book(nearestCar, location)

    return nearestCar
  }

  move = (cars: Car[]): Car[] => {
    for (const car of cars) {
      if (car.status === CarStatus.BOOKED) {
        // Car arrives to the destination
        if (car.timeUnit === 1) {
          car.startCoordinate = car.destCoordinate
          car.status = CarStatus.AVAILABLE
        }
        car.timeUnit--
      }
    }

    return cars
  }
}
