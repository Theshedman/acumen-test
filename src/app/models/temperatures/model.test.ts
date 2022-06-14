import { Model } from 'objection';
import { BaseModel } from '../base';
import { TemperatureModel } from './model';

describe('Temperature Model Unit Test', () => {

  it('should be defined', () => {
    expect(TemperatureModel).toBeDefined();
  });

  it('should be an instance of a BaseModel', () => {
    expect(TemperatureModel.prototype).toBeInstanceOf(BaseModel);
  });

  it('should be an instance of a Model', () => {
    expect(TemperatureModel.prototype).toBeInstanceOf(Model);
  });

  it('should have a tableName', () => {
    expect(TemperatureModel.tableName).toBe('acumen-service.temperatures');
  });

  it('should have a jsonSchema', () => {
    expect(TemperatureModel.jsonSchema).toBeDefined();
    expect(TemperatureModel.jsonSchema).toEqual({
      type: 'object',
      required: ['city_id', 'max', 'min'],
      properties: {
        id: { type: 'number' },
        city_id: { type: 'number' },
        max: { type: 'number' },
        min: { type: 'number' },
        timestamp: { type: 'number' },
      },
    });
  });
});
