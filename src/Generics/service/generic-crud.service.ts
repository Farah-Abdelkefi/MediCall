import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class GenericCrudService<Entity> {
  constructor(private repository: Repository<Entity>) {}

  create(entity): Promise<Entity> {
    return this.repository.save(entity);
  }

  async update(id, entity): Promise<Entity> {
    const result = await this.repository.preload({ id, ...entity });
    if (!result) {
      throw new NotFoundException('id not found');
    }
    return this.repository.save(result);
  }

  remove(id): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  softDelete(id) {
    const res = this.repository.softDelete(id);
    if (res) {
      return { message: 'Deleted' };
    } else {
      throw new NotFoundException(`id not found`);
    }
  }
  restore(id): Promise<UpdateResult> {
    return this.repository.restore(id);
  }

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async findOne(id): Promise<Entity> {
    const element = await this.repository
      .createQueryBuilder('s')
      .where('s.id = :id', { id: id })
      .getOne();

    if (!element) {
      throw new NotFoundException('id not found');
    }
    return element;
  }
  async findOneByMail(mail): Promise<Entity> {
    return await this.repository
      .createQueryBuilder('s')
      .where('s.email = :mail', { mail: mail })
      .getOne();
  }
}
