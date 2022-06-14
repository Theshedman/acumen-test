import { JSONSchema } from 'objection';
import { BaseModel } from '../base';
import { ICity } from './model.interface';
import { SchemaName, TableName } from '../../../database';
import { CityModelValidation } from './model.validation';

export class CityModel extends BaseModel implements ICity {
  public id: ICity['id'];
  public name: ICity['name'];
  public latitude: ICity['latitude'];
  public longitude: ICity['longitude'];

  static get tableName() {
    return `${SchemaName.acumenService}.${TableName.cities}`;
  }

  public static get jsonSchema(): JSONSchema {
    return CityModelValidation;
  }
}
