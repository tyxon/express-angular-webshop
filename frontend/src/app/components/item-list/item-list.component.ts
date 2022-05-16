import {Component, OnInit} from '@angular/core';
import {ItemService} from "@/app/services/item.service";
import {Item} from "@/app/models/Item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public items: Item[] = [];

  constructor(private itemService: ItemService) {
    itemService.getItems().subscribe(value => {
      this.items = value;
      this.items.forEach(item => {
        item.quantity = 1;
      })
    });
  }

  ngOnInit(): void {
  }

  public addToBasket(id: string) {

  }
}
