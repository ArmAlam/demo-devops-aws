import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.itemsService.create(body.name);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
