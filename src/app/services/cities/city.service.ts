import { constants } from 'http2';
import { inject, injectable } from 'inversify';
import { ModuleToken } from '../../configs/module.token';
import { ICity } from '../../models';
import { CityRepository } from '../../repositories';
import { GenericError, logger } from '../../utils';

@injectable()
export class CityService {
  @inject(ModuleToken.CityRepository)
  private readonly cityRepository: CityRepository;

  public async create(data: ICity): Promise<ICity> {
    logger.info(`Running CityService.create`);

    const existingCity = await this.findOne({ name: data.name });

    if (existingCity) {
      throw new GenericError('City already exists, please add a different city', constants.HTTP_STATUS_CONFLICT);
    }

    return this.cityRepository.create(data);
  }

  public async update(id: number, data: ICity): Promise<ICity> {
    logger.info(`Running CityService.update`);

    const city = await this.cityRepository.findById(id);

    if (!city) {
      throw new GenericError('City with the provided ID does not exist', constants.HTTP_STATUS_NOT_FOUND);
    }

    return this.cityRepository.update(id, data);
  }

  public async findOne(data: Partial<ICity>): Promise<ICity> {
    return this.cityRepository.findOne(data);
  }

  public async delete(id: number): Promise<void> {
    logger.info(`Running CityService.delete`);

    const city = await this.cityRepository.findById(id);

    if (!city) {
        throw new GenericError('City with the provided ID does not exist', constants.HTTP_STATUS_NOT_FOUND);
    }

    await this.cityRepository.delete(id);

    return city;
  }
}
