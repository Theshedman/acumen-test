import axios from 'axios';
import { constants } from 'http2';
import { inject, injectable } from 'inversify';
import { ModuleToken } from '../../configs/module.token';
import { ITemperature, IWebhook } from '../../models';
import { CityRepository, WebhookRepository } from '../../repositories';
import { GenericError, logger } from '../../utils';
import { EventName, webhookEvent } from '../events';

@injectable()
export class WebhookService {

  @inject(ModuleToken.CityRepository)
  private readonly cityRepository: CityRepository;

  @inject(ModuleToken.WebhookRepository)
  private readonly webhookRepository: WebhookRepository;

  public async create(data: IWebhook): Promise<IWebhook> {
    logger.info(`Running WebhookService.create`);

    const cityExists = await this.cityRepository.findById(data.city_id);

    if (!cityExists) {
      throw new GenericError('City with the provided ID does not exist', constants.HTTP_STATUS_BAD_REQUEST);
    }

    return this.webhookRepository.create(data);
  }

  public async delete(id: number): Promise<IWebhook> {
    logger.info(`Running WebhookService.delete`);

    const webhookToBeDeleted = await this.webhookRepository.findById(id);

    if (!webhookToBeDeleted) {
        throw new GenericError('Webhook with the provided ID does not exist', constants.HTTP_STATUS_NOT_FOUND);
    }

    await this.webhookRepository.delete(id);

    return webhookToBeDeleted;
  }

  public async handleWebhookEvents(): Promise<void> {
    logger.info(`Running WebhookService.handleWebhookEvents`);

    webhookEvent.on(EventName.SEND_TEMPERATURE_DATA, async (data: ITemperature) => {
      const webhookDetail: IWebhook = await this.webhookRepository.findOne({ city_id: Number(data.city_id) });

      if (webhookDetail) {
        logger.info(`[x] Sending temperature data to webhook subscribers: ${webhookDetail.callback_url}`);
        logger.info('');

        await axios.post(webhookDetail.callback_url, data);
      }
    });
  }
}
