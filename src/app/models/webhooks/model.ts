import { JSONSchema } from 'objection';
import { BaseModel } from '../base';
import { SchemaName, TableName } from '../../../database';
import { IWebhook } from './model.interface';
import { WebhookModelValidation } from './model.validation';

export class WebhookModel extends BaseModel implements IWebhook {
  public id: IWebhook['id'];
  public city_id: IWebhook['city_id'];
  public callback_url: IWebhook['callback_url'];

  static get tableName() {
    return `${SchemaName.acumenService}.${TableName.webhooks}`;
  }

  public static get jsonSchema(): JSONSchema {
    return WebhookModelValidation;
  }
}
