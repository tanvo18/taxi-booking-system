import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
  }

  private setConfig = () => {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json());
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // Enables cors
    this.app.use(cors());
  }
}

export default new App().app;
