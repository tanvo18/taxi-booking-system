import { Request, Response, NextFunction, Router } from 'express'
import { CarService } from '../services/car'
import { HttpStatusCode } from '../enums/http-status-code'
import { ErrorException } from '../error-handler/error-exception'
import { ErrorCode } from '../error-handler/error-code'

export class CarController {
  router: Router
  carService: CarService

  constructor(carService: CarService) {
    this.router = Router()
    this.carService = carService
    this.setRoutes()
  }

  setRoutes = () => {
    this.router.get('/cars', this.getCars)
    this.router.post('/book', this.bookCar)
    this.router.post('/tick', this.tick)
    this.router.put('/reset', this.reset)
  }

  getCars = (req: Request, res: Response) => {
    const cars = this.carService.getCars()

    res.send(cars)
  }

  bookCar = (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const { source, destination } = body

      if (!source || !destination) {
        throw new ErrorException(ErrorCode.BAD_REQUEST, 'Missing source or destination')
      }

      const cars = this.carService.getCars()
      const nearestCar = this.carService.findNearestCar(cars, body)

      if (!nearestCar) {
        return res.status(HttpStatusCode.OK).send({})
      }

      return res.status(HttpStatusCode.OK).send({car_id: nearestCar.id, total_time: nearestCar.timeUnit})
    } catch (error) {
      next(error)
    }
  }

  tick = (req: Request, res: Response) => {
    const cars = this.carService.getCars()
    this.carService.move(cars)

    res.send({message: 'The service time has increased'})
  }

  reset = (req: Request, res: Response) => {
    this.carService = new CarService()

    res.send(this.carService.cars)
  }
}
