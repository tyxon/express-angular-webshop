import express, {Application} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import ErrorHandlerMiddleware from "@/middlewares/ErrorHandlerMiddleware";
import cors from "cors";

export interface Options {
  port: number;
  mongoUser: string;
  mongoPassword: string;
  mongoPath: string;
}

export class ControllerHolder {
  public readonly controller: any;
  public readonly middlewares: any[] = [];

  constructor(controller: any, middlewares?: any[]) {
    this.controller = controller;
    if (middlewares) {
      this.middlewares.push(...middlewares);
    }
  }
}

class App {
  private app: Application;
  private options: Options;
  private controllers: ControllerHolder[];

  constructor(controllers: ControllerHolder[], options: Options) {
    this.app = express();
    this.options = options;
    this.controllers = controllers;
  }

  private initializePreRequestMiddlewares() {
    const corsOptions = {

    };
    this.app.use(cors(corsOptions))
    this.app.use(bodyParser.json());
  }

  private initializePostRequestMiddlewares() {
    this.app.use(ErrorHandlerMiddleware);
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controllerHolder: ControllerHolder) => {
      this.app.use('/', ...controllerHolder.middlewares, controllerHolder.controller.router);
    });
  }

  private async initDatabase() {
    console.log("mongo", `mongodb://${this.options.mongoUser}:${this.options.mongoPassword}${this.options.mongoPath}`);
    return await mongoose.connect(`mongodb://${this.options.mongoUser}:${this.options.mongoPassword}${this.options.mongoPath}?authSource=admin`);
  }

  public async listen() {
    await this.initDatabase();
    this.initializePreRequestMiddlewares();
    this.initializeControllers(this.controllers);
    this.initializePostRequestMiddlewares();

    this.app.listen(this.options.port, () => {
      console.log(`App listening on the port ${this.options.port}`);
    });
  }
}

export default App;
