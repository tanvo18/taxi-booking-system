import { Request, Response, NextFunction, Router } from 'express'
import { Car } from '../models/car'
import { CarService } from '../services/car'
import { HttpStatusCode } from '../enums/http-status-code'
import { ErrorException } from '../error-handler/error-exception'
import { ErrorCode } from '../error-handler/error-code'

export class CarController {
  router: Router
  carService: CarService
  cars: Car[]

  constructor(carService: CarService) {
    this.router = Router()
    this.carService = carService
    this.cars = carService.initializeCars(3)
    this.setRoutes()
  }

  setRoutes = () => {
    this.router.get('/', this.getCars)
    this.router.post('/book', this.bookCar)
  }

  getCars = (req: Request, res: Response) => {
    res.send(this.cars)
  }

  bookCar = (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const { source, destination } = body

      if (!source || !destination) {
        throw new ErrorException(ErrorCode.BAD_REQUEST, 'Missing source or destination')
      }

      const nearestCar = this.carService.findNearestCar(this.cars, body)

      if (!nearestCar) {
        return res.status(HttpStatusCode.OK).send({})
      }

      return res.status(HttpStatusCode.OK).send({car_id: nearestCar.id, total_time: nearestCar.timeUnit})
    } catch (error) {
      next(error)
    }
  }
}
