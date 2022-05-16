import mongoose from "mongoose";
import {Item} from "@/models/Item";

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const ItemRepository = mongoose.model<Item & mongoose.Document>("Item", itemSchema);

export default ItemRepository;
