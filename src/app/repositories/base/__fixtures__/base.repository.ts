import { injectable, unmanaged } from 'inversify';
import _ from 'lodash';
import { DbAccess } from '../base.interface';

@injectable()
export class TestBaseRepository implements DbAccess {
  private model: any;

  constructor(@unmanaged() modelClass: any) {
    this.model = modelClass;
  }

  public generateNewId(): number {
    return this.model.length + 1;
  }

  public async create<T>(data: any): Promise<T> {
    const id = this.generateNewId();
    if (!data.id) data.id = id;

    this.model.push(data);

    return Promise.resolve(data);
  }

  public async findAll<T = any>(params?: T): Promise<any[]> {
    return Promise.resolve(this.model);
  }

  public async findOne<T = any>(data: T): Promise<T> {
    const result = await this.findMany<T>(data);

    return Promise.resolve(result[0]);
  }

  public async findMany<T = any>(data: T): Promise<T[]> {
    // eslint-disable-next-line array-callback-return
    const result = this.model.filter((obj: T) => {
      let isMatch = false;

      const fields = Object.keys(data);

      for (const key of fields) {
        // @ts-ignore
        isMatch = obj[key] === data[key];
      }

      if (isMatch) {
        return obj;
      }
    });

    return Promise.resolve(result);
  }

  public async findById<T = any>(id: number): Promise<T> {
    // @ts-ignore
    return this.findOne<T>({ id });
  }

  public async update<T = any>(id: number, data: T): Promise<T> {
    const result = this.model.filter((obj: T) => {
      // @ts-ignore
      if (obj.id === id || obj.resource_id === id) {
        return obj;
      }

      return null;
    });

    if (result[0]) {
      _.remove(this.model, result[0]);
    }

    const updatedUser = { ...result[0], ...data };

    this.model.push(updatedUser);

    return Promise.resolve(updatedUser);
  }

  public async delete<T = any>(id: number): Promise<T> {
    const result = this.model.filter((obj: T) => {
      // @ts-ignore
      if (obj.id === id) {
        return obj;
      }

      return null;
    });

    if (result[0]) {
      _.remove(this.model, result[0]);
    }

    return Promise.resolve(result[0]);
  }

  public async deleteAll<T = any>(): Promise<T[]> {
    this.model = [];

    return Promise.resolve(this.model);
  }
}

let model: any[] = [];
let tRepo: any;
export const TestModel = {
  setModel: (data: any[]) => {
    tRepo = new TestBaseRepository(data);
  },

  query: () => {
    return {
      insertAndFetch: async (data: any) => {
        return tRepo.create(data);
      },

      findAll: async () => {
        return tRepo.findAll();
      },

      where: (data: any) => {
        return {
          first: async () => {
            return tRepo.findOne(data);
          },
        };
      },

      findById: async (id: number) => {
        return tRepo.findById(id);
      },

      patchAndFetchById: async (id: number, data: any) => {
        return tRepo.update(id, data);
      },

      deleteById: async (id: number) => {
        return tRepo.delete(id);
      },

      delete: async () => {
        return tRepo.deleteAll();
      },
    };
  },
};
