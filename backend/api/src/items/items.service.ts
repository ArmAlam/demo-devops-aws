import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(name: string) {
    const item = this.itemRepository.create({ name });
    const savedItem = await this.itemRepository.save(item);

    return savedItem;
  }

  async findAll() {
    return this.itemRepository.find();
  }
}
