import {Controller, Delete, Get, Post, Put} from "@/base/ControllerDecorators";
import {Request, Response} from "express";
import {Item} from "@/models/Item";
import ItemRepository from "@/repositories/ItemRepository";
import NotFoundError from "@/errors/NotFoundError";

@Controller()
export default class ItemController {
  private _itemRepository = ItemRepository;

  @Get("/items")
  public async getItems(req: Request, resp: Response): Promise<Item[]> {
    const items = await this._itemRepository.find();

    return items;
  }

  @Post("/item")
  public async createItem(req: Request, resp: Response) {
    const itemData: Item = req.body;

    let entity = new this._itemRepository(itemData);
    return await entity.save();
  }

  @Put("/item/:id")
  public async updateItem(req: Request, resp: Response) {
    const itemData: Item = req.body;
    const id = req.params["id"];

    if (id) {
      let entity = await this._itemRepository.findByIdAndUpdate(id, itemData);
      if (entity != null) {
        return entity;
      }
    }

    throw new NotFoundError();
  }

  @Get("/item/:id")
  public async getItem(req: Request, resp: Response) {
    const id = req.params["id"];
    if (id) {
      let entity = this._itemRepository.findById(id);
      if (entity) {
        return entity;
      }
    }

    throw new NotFoundError();
  }

  @Delete("/item/:id")
  public async deleteItem(req: Request, resp: Response) {
    const id = req.params["id"];
    if (id) {
      let entity = await this._itemRepository.findById(id);
      if (entity != null) {
        this._itemRepository.deleteOne({_id: id});
        return;
      }
    }

    throw new NotFoundError();
  }
}
