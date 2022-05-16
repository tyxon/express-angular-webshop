import {Component, OnInit} from '@angular/core';
import {Item} from "@/app/models/Item";
import {BasketService} from "@/app/services/basket.service";
import {Order} from "@/app/models/Order";
import {OrderService} from "@/app/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public order: Order = <Order>{};

  constructor(private router: Router, private basketService: BasketService, private orderService: OrderService) {
    this.order.items = this.basketService.getItems();
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

  orderItems() {
    if (this.order.items.length > 0) {
      this.orderService.sendOrder(this.order);
      this.basketService.clear();
      alert("Sikeres rendelés");
      this.router.navigateByUrl("termekek")
    } else {
      alert("Üres a kosár");
    }
  }
}
