import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess } from '../base';

describe('City Repository Unit Test', () => {
    let cityRepo: DbAccess;
    beforeEach(() => {
      cityRepo = container.get<DbAccess>(ModuleToken.CityRepository);
    });

  it('should be defined', () => {
    expect(cityRepo).toBeDefined();
  });
});
