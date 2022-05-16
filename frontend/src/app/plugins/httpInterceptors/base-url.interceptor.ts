import {Inject, Injectable} from "@angular/core";
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from "@angular/common/http";

import {Observable} from "rxjs";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject("BASE_API_URL") private baseUrl: string) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMjE2MjM5MDIyLCJpc3MiOiJ3ZWJzaG9wLmxvY2FsIiwiYXVkIjoid2Vic2hvcC5sb2NhbCJ9.YJVdTxs_V9fRrWlYeM4PMhKGxHdedMwDtAf6WWkNzYc";
    req = req.clone({
      url: `${this.baseUrl}/${req.url}`
    });
    return next.handle(req);
  }
}
