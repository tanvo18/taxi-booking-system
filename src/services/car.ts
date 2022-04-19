import { Car } from '../models/car'
import { Location } from '../interfaces/location'
import { CarStatus } from '../enums/car-status'
import { calculateTimeUnit } from '../utils/utils'
export class CarService {
  initializeCars = (quantity: number): Car[] => {
    const cars: Car[] = []

    for (let i = 1; i <= quantity; i++) {
      cars.push(new Car(i))
    }

    return cars
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
    let minTimeUnit = Number.POSITIVE_INFINITY
    const nearestCars: Car[] = []
    let timeUnit

    if (availableCars.length === 0) {
      return null
    }

    for (const car of availableCars) {
      timeUnit = calculateTimeUnit(car.startCoordinate, location.source)

      if (timeUnit <= minTimeUnit) {
        minTimeUnit = timeUnit
        nearestCars.push(car)
      }
    }

    // Returns car with smallest id (in case we have many cars with the same location)
    let nearestCar = nearestCars.sort((car1, car2) => car1.id - car2.id)[0]
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
