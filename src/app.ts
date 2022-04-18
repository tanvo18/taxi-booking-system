import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { CarController } from './controllers/car'
import { CarService } from './services/car';
class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setControllers();
  }

  setConfig = () => {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json());
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // Enables cors
    this.app.use(cors());
  }

  setControllers = () => {
    const carController = new CarController(new CarService());
    this.app.use('/api', carController.router)
  }
}

export default new App().app;
