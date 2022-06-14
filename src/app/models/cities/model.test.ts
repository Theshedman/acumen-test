import { Model } from 'objection';
import { BaseModel } from '../base';
import { CityModel } from './model';

describe('City Model Unit Test', () => {

  it('should be defined', () => {
    expect(CityModel).toBeDefined();
  });

  it('should be an instance of a BaseModel', () => {
    expect(CityModel.prototype).toBeInstanceOf(BaseModel);
  });

  it('should be an instance of a Model', () => {
    expect(CityModel.prototype).toBeInstanceOf(Model);
  });

  it('should have a tableName', () => {
    expect(CityModel.tableName).toBe('acumen-service.cities');
  });

  it('should have a jsonSchema', () => {
    expect(CityModel.jsonSchema).toBeDefined();
    expect(CityModel.jsonSchema).toEqual({
      type: 'object',
      required: ['name', 'latitude', 'longitude'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
      },
    });
  });
});
