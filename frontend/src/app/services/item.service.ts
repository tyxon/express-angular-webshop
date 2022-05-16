import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Item} from "@/app/models/Item";

@Injectable({
  providedIn: "root",
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItems() {
    console.log(this.httpClient);
    return this.httpClient.get<Item[]>("items");
  }
}
