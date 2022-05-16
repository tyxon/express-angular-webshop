import {Item} from "@/app/models/Item";

export interface Order {
  _id: string,
  name: string,
  address: string,
  items: Item[];
}
