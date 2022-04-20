import chai, { expect } from 'chai'
import { CarStatus } from '../enums/car-status'
import { Car } from '../models/car'
import { CarService } from '../services/car'

describe('Test service', () => {
  const carService = new CarService()
  let cars: Car[]
  const location = {
    'source': {
      'x': 1,
      'y': 1
    },
    'destination': {
      'x': 2,
      'y': 2
    }
  }

  beforeEach(async () => {
    cars = carService.initializeCars(3)
  })

  it('should calculate the timeUnit for the cars correctly when booking', async () => {
    const car: Car = carService.book(cars[0], location)
    expect(car.destCoordinate).to.deep.equal(location.destination)
    expect(car.status).to.equal(CarStatus.BOOKED)
    expect(car.timeUnit).to.equal(4)
  })

  it('should find the nearest car with the smallest id for customer', async () => {
    // Setup car
    // The first car is further than the other cars
    const firstCar = cars[0]
    firstCar.startCoordinate = { x: 20, y: 20 }
    firstCar.destCoordinate = { x: 20, y: 20 }

    const car = carService.findNearestCar(cars, location)

    if (car) {
      expect(car.id).to.equal(2)
      expect(car.id).not.to.equal(3)
      expect(car.timeUnit).to.equal(4)
    }
  })

  describe('Test car moving', () => {
    let firstCar: Car
    beforeEach(async () => {
      cars = carService.initializeCars(3)

      firstCar = cars[0]
      firstCar.startCoordinate = { x: 0, y: 0 }
      firstCar.destCoordinate = { x: 1, y: 1 }
      firstCar.status = CarStatus.BOOKED
      firstCar.timeUnit = 2
    })

    it('should reduce 1 time unit when the car moves', async () => {
      // Setup car
      // The first car is further than the other cars

      carService.move(cars)

      expect(firstCar.timeUnit).to.equal(1)
    })

    it('should return status available when arrive to the destination', async () => {
      // Setup car
      // The first car is further than the other cars
      carService.move(cars)
      carService.move(cars)

      expect(firstCar.timeUnit).to.equal(0)
      expect(firstCar.status).to.equal(CarStatus.AVAILABLE)
    })
   })
})

