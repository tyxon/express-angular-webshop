import "module-alias/register";
import "@/plugins/Dotenv";
import App, {ControllerHolder, Options} from "@/App";
import ItemController from "@/controllers/ItemController";
import passport from "passport";
import "@/plugins/Passport";
import OrderController from "@/controllers/OrderController";

const options = <Options>{
  port: Number.parseInt(process.env.PORT ?? "3000"),
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoPath: process.env.MONGO_PATH
};

const app = new App(
  [
    new ControllerHolder(new ItemController(), [passport.authenticate("jwt", {session: false})]),
    new ControllerHolder(new OrderController(), [passport.authenticate("jwt", {session: false})])
  ],
  options,
);

app.listen();
