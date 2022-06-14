import 'reflect-metadata';
import { Model, ModelClass } from 'objection';
import { container } from '../../configs/inversity.config';
import { TestModel } from './__fixtures__';
import { BaseRepository } from './base.repository';

describe('Base Repository Unit Test', () => {
  let baseRepo: BaseRepository;
  TestModel.setModel([{
    id: 2,
    name: 'To Be Deleted',
  }]);

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    baseRepo = new BaseRepository(TestModel as unknown as ModelClass<Model>);
    // baseRepo = container.get<DbAccess>(ModuleToken.BaseRepository);
  });

  afterEach(async () => {

    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    container.restore();

    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  afterAll((done) => {

    baseRepo.deleteAll().then();

    done();
  });

  it('should be defined', () => {

    expect(baseRepo).toBeDefined();
  });

  it('should create a new record', async () => {
    const data = {
      id: 1,
      name: 'Test 1',
    };

    const result = await baseRepo.create(data);

    expect(result).toEqual(data);
  });

  it('should find all records', async () => {
    const data = [
      {
        id: 2,
        name: 'To Be Deleted',
      },

      {
        id: 1,
        name: 'Test 1',
      },
    ];

    const result = await baseRepo.findAll();
    const returnData = await result.findAll();

    expect(returnData).toEqual(data);
  });

  it('should find one record', async () => {
    const data = {
      id: 1,
      name: 'Test 1',
    };

    const result = await baseRepo.findOne({ id: 1 });

    expect(result).toEqual(data);
  });

  it('should find one record by id', async () => {
    const result = await baseRepo.findById(1);

    expect(result).toEqual({
      id: 1,
      name: 'Test 1',
    });
  });

  it('should update a record', async () => {
    const result = await baseRepo.update(2, { name: 'Delete Record' });

    expect(result).toEqual({
      id: 2,
      name: 'Delete Record',
    });
  });

  it('should delete a record by ID', async () => {
    const result = await baseRepo.delete(2);

    expect(result).toEqual({
      id: 2,
      name: 'Delete Record',
    });
  });

  it('should delete all records', async () => {
    const result = await baseRepo.deleteAll();

    expect(result).toEqual([]);
  });

  it('should have method create', async () => {
    expect(typeof baseRepo.create).toBe('function');
  });

  it('should have method findOne', async () => {
    expect(typeof baseRepo.findOne).toBe('function');
  });

  it('should have method findAll', async () => {
    expect(typeof baseRepo.findAll).toBe('function');
  });

  it('should have method findById', async () => {
    expect(typeof baseRepo.findById).toBe('function');
  });

  it('should have method update', async () => {
    expect(typeof baseRepo.update).toBe('function');
  });

  it('should have method delete', async () => {
    expect(typeof baseRepo.delete).toBe('function');
  });
});
