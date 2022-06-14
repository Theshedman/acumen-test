import { JSONSchema } from 'objection';
import { BaseModel } from '../base';
import { SchemaName, TableName } from '../../../database';
import { ITemperature } from './model.interface';
import { TemperatureModelValidation } from './model.validation';

export class TemperatureModel extends BaseModel implements ITemperature {
  public id: ITemperature['id'];
  public city_id: ITemperature['city_id'];
  public min: ITemperature['min'];
  public max: ITemperature['max'];
  public timestamp: ITemperature['timestamp'];

  static get tableName() {
    return `${SchemaName.acumenService}.${TableName.temperatures}`;
  }

  public static get jsonSchema(): JSONSchema {
    return TemperatureModelValidation;
  }
}
