import { IBaseModel } from '../base';

export interface IWebhook extends IBaseModel {
  city_id: number;
  callback_url: string;
}
