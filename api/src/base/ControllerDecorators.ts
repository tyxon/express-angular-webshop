import {Router, Request, Response} from "express";

type methodTypes = "GET" | "POST" | "PUT" | "DELETE";

interface Route {
  path: string;
  method: methodTypes;
  func: (req: Request, resp: Response) => any;
}

function removeTrailingSlash(value?: string): string {
  if (value) {
    return value.replace(/\/$/, "");
  }
  return "";
}

export function Controller(prefix?: string) {
  return function <T extends { new(...args: any[]): {} }>(Base: T) {
    return class extends Base {
      public router: Router = Router();

      constructor(...args: any[]) {
        super(...args);
        const routes = Base.prototype["Routes"];
        if (routes) {
          routes.forEach((route: Route, methodName: string) => {
            const path = `${removeTrailingSlash(prefix)}${removeTrailingSlash(route.path)}`;
            // @ts-ignore
           // console.log(path, route.func.call(this, {}, {}));
            switch (route.method) {
              case "GET":
                this.router.get(path, route.func.bind(this));
                break;
              case "POST":
                this.router.post(path, route.func.bind(this));
                break;
              case "PUT":
                this.router.put(path, route.func.bind(this));
                break;
              case "DELETE":
                this.router.delete(path, route.func.bind(this));
                break;
            }
          });
        }
      }
    }
  }
}

export function MapRoute(path: string, method: methodTypes) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const req = args[0];
      const resp = args[1];
      const next = args[2];

      try {
        const result = originalMethod.apply(this, args);

        if (result) {
          result.then(result => {
            resp.json(result);
            resp.end();
          }).catch((error: any) => {
            next(error);
          });
        }
      } catch (error: any) {
        next(error);
      }
    }

    target["Routes"] = target["Routes"] || new Map();
    target["Routes"].set(propertyKey, <Route>{
      path: path,
      method: method,
      func: descriptor.value
    });

    return descriptor;
  };
}

export function Get(path: string) {
  return MapRoute(path, "GET");
}

export function Post(path: string) {
  return MapRoute(path, "POST");
}

export function Put(path: string) {
  return MapRoute(path, "PUT");
}

export function Delete(path: string) {
  return MapRoute(path, "DELETE");
}
