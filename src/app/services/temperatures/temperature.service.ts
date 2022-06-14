import { constants } from 'http2';
import { inject, injectable } from 'inversify';
import { ModuleToken } from '../../configs/module.token';
import { ITemperature } from '../../models';
import { CityRepository, TemperatureRepository } from '../../repositories';
import { GenericError, logger } from '../../utils';
import { EventName, webhookEvent } from '../events';

@injectable()
export class TemperatureService {
  @inject(ModuleToken.CityRepository)
  private readonly cityRepository: CityRepository;

  @inject(ModuleToken.TemperatureRepository)
  private readonly temperatureRepository: TemperatureRepository;

  public async create(data: ITemperature): Promise<ITemperature> {
    logger.info(`Running TemperatureService.create`);

    const cityExists = await this.cityRepository.findById(data.city_id);

    if (!cityExists) {
        throw new GenericError('City with the provided ID does not exist', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const subscribedTemperatureData = await this.temperatureRepository.create(data);

    webhookEvent.emit(EventName.SEND_TEMPERATURE_DATA, subscribedTemperatureData);

    return subscribedTemperatureData;
  }

  public async findOne(data: Partial<ITemperature>): Promise<ITemperature> {
    logger.info(`Running TemperatureService.findOne`);

    return this.temperatureRepository.findOne(data);
  }
}
