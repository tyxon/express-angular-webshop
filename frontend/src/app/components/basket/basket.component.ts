import { Component, OnInit } from '@angular/core';
import {Item} from "@/app/models/Item";
import {BasketService} from "@/app/services/basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public items: Item[] = [];

  constructor(private basketService: BasketService) {
    this.items = this.basketService.getItems();
  }

  ngOnInit(): void {
  }

  increase(id: string) {
    this.basketService.increaseQuantity(id);
  }

  decrease(id: string) {
    this.basketService.decreaseQuantity(id);
  }

  remove(id: string) {
    this.basketService.removeById(id);
  }

  order() {

  }
}
