import { Request, Response, NextFunction, Router } from 'express'
import { CarService } from '../services/car'

export class CarController {
  router: Router
  carService: CarService

  constructor(carService: CarService) {
    this.router = Router()
    this.carService = carService

    this.setRoutes()
  }

  setRoutes = () => {
    this.router.get('/', this.hello)
  }

  hello = (req: Request, res: Response, next: NextFunction) => {
    res.send('hello')
  }
}
