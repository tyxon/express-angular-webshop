import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "@/app/models/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  sendOrder(order: Order) {
    console.log("sendOrder", order);
    return this.httpClient.post("order", order).subscribe(value => console.log(value));
  }
}
