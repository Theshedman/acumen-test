import { constants } from 'http2';
import { inject, injectable } from 'inversify';
import { GenericError, logger } from '../../utils';
import { ITemperature } from '../../models';
import { TemperatureService } from '../temperatures';
import { ModuleToken } from '../../configs/module.token';

@injectable()
export class ForecastService {
  @inject(ModuleToken.TemperatureService)
  private readonly temperatureService: TemperatureService;

  public async findByCity(cityId: number): Promise<ITemperature> {
    logger.info(`Running ForecastService.findByCity`);

    const temperatureForACity = await this.temperatureService.findOne({ city_id: cityId });

    if (!temperatureForACity) {
      throw new GenericError('City with the provided ID does not exist', constants.HTTP_STATUS_NOT_FOUND);
    }

    const { max: maxTemperature, min: minTemperature } = temperatureForACity;

    const sample = (Number(maxTemperature) + Number(minTemperature)) / 2;

    const forecastData = {
      ...temperatureForACity,
      sample,
    };

    delete forecastData.timestamp;

    return forecastData;
  }
}
