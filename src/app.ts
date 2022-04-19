import { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { CarController } from './controllers/car'
import { CarService } from './services/car'
import { BaseRouter } from './routers/base-router'
class App {
  app: Application

  constructor() {
    this.app = express()
    this.setConfig()
    this.setControllers()
  }

  setConfig = () => {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json())
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ extended: true }))
    // Enables cors
    this.app.use(cors())
  }

  setControllers = () => {
    const baseRouter = new BaseRouter().router
    new CarController(new CarService(), baseRouter)
    this.app.use('/api', baseRouter)
  }
}

export default new App().app
