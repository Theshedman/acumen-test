import { IBaseModel } from '../base';

export interface ICity extends IBaseModel{
  name: string;
  latitude: number;
  longitude: number;
}
