import { Injectable } from '@angular/core';
import {Item} from "@/app/models/Item";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private readonly key = "basket";

  private basket: Item[] = [];

  constructor() {
    const storageBasket = sessionStorage.getItem(this.key);
    if (storageBasket) {
      this.basket = JSON.parse(storageBasket);
    }
  }

  public getItems() {
    return this.basket;
  }

  public add(item: Item) {
    const itemInBasket = this.findById(item._id);
    if (itemInBasket) {
      itemInBasket.quantity += item.quantity;
    } else {
      this.basket.push(item);
    }

    this.commit();
  }

  public removeById(id: string) {
    const itemIndex = this.basket.findIndex(x => x._id === id);
    this.basket.splice(itemIndex, 1);

    this.commit();
  }

  public remove(item: Item) {
    this.removeById(item._id);
  }

  public increaseQuantity(id: string) {
    const item = this.findById(id);
    if (item) {
      item.quantity++;
    }

    this.commit();
  }

  public decreaseQuantity(id: string) {
    const item = this.findById(id);
    if (item) {
      if (item.quantity <= 1) {
        this.removeById(id);
      } else {
        item.quantity--;
      }
    }

    this.commit();
  }

  public clear() {
    this.basket = [];
    this.commit();
  }

  private findById(id: string) {
    return this.basket.find(x => x._id === id);
  }

  private commit() {
    sessionStorage.setItem(this.key, JSON.stringify(this.basket));
  }
}
