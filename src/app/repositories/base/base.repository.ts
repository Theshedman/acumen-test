import { injectable, unmanaged } from 'inversify';
import { Model, ModelClass } from 'objection';
import { logger } from '../../utils';
import { DbAccess } from './base.interface';

@injectable()
export class BaseRepository implements DbAccess {
  private readonly model: ModelClass<Model>;

  constructor(@unmanaged() model: ModelClass<Model>) {
    this.model = model;
  }

  public async create<T>(data: T): Promise<any> {
    logger.info('Running BaseRepository.create');

    return this.model.query().insertAndFetch(data);
  }

  public async findAll(): Promise<any> {
    logger.info('Running BaseRepository.findAll');

    return this.model.query();
  }

  public async findOne<T>(data: T): Promise<any> {
    logger.info('Running BaseRepository.findOne');

    return this.model.query().where(data).first();
  }

  public async findById(id: number): Promise<any> {
    logger.info('Running BaseRepository.findById');

    return this.model.query().findById(id);
  }

  public async update<T>(id: number, data: T): Promise<any> {
    logger.info('Running BaseRepository.update');

    return this.model.query().patchAndFetchById(id, data);
  }

  public async delete(id: number): Promise<any> {
    logger.info('Running BaseRepository.delete');

    return this.model.query().deleteById(id);
  }

  public async deleteAll(): Promise<any> {
    logger.info('Running BaseRepository.delete');

    return this.model.query().delete();
  }
}
