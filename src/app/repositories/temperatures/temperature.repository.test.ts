import 'reflect-metadata';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { DbAccess } from '../base';

describe('Temperature Repository Unit Test', () => {
  let temperatureRepo: DbAccess;
  beforeEach(() => {
    temperatureRepo = container.get<DbAccess>(ModuleToken.TemperatureRepository);
  });

  it('should be defined', () => {
    expect(temperatureRepo).toBeDefined();
  });
});
