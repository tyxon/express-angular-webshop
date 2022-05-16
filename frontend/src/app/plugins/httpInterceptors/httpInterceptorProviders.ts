import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "@/app/plugins/httpInterceptors/auth.interceptor";
import {BaseUrlInterceptor} from "@/app/plugins/httpInterceptors/base-url.interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
