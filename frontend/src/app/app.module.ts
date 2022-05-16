import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "@/app/plugins/httpInterceptors/httpInterceptorProviders";
import {environment} from "@/environments/environment";
import { ItemListComponent } from './components/item-list/item-list.component';
import { ErrorComponent } from './components/error/error.component';
import {FormsModule} from "@angular/forms";
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ErrorComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: "BASE_API_URL", useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
