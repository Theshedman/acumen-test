import { ContainerModule, interfaces } from 'inversify';
import { CityRepository } from './cities';
import { WebhookRepository } from './webhooks';
import { BaseRepository, DbAccess } from './base';
import { ModuleToken } from '../configs/module.token';
import { TemperatureRepository } from './temperatures';

import Bind = interfaces.Bind;

export const repositoryModule = new ContainerModule((bind: Bind) => {
  bind<DbAccess>(ModuleToken.BaseRepository).to(BaseRepository);
  bind<DbAccess>(ModuleToken.CityRepository).to(CityRepository);
  bind<DbAccess>(ModuleToken.WebhookRepository).to(WebhookRepository);
  bind<DbAccess>(ModuleToken.TemperatureRepository).to(TemperatureRepository);
})
