import { IBaseModel } from '../base';

export interface ITemperature extends IBaseModel {
  city_id: number;
  max: number;
  min: number;
  timestamp?: number;
}
