export interface DbAccess {
  create<T>(data: T): Promise<T>;

  findAll(): Promise<any>;

  findOne<T>(data: T): Promise<T>;

  findById(id: number): Promise<any>;

  update<T>(id: number, data: T): Promise<any>;

  delete(id: number): Promise<any>;
}
