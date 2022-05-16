import {Controller, Get} from "@/base/ControllerDecorators";
import {Request, Response} from "express";

@Controller("/")
export default class HomeController {
  @Get("/test")
  public getTest(req: Request, resp: Response): any {
    return {"hello": "world"};
  }

  @Get("/test2")
  public getTest2(req: Request, resp: Response): void {
    console.log("test2")
  }
}




