import { Container } from 'inversify';
import { appModule } from '../app';
import { controllerModule } from '../controllers';
import { serviceModule } from '../services';
import { repositoryModule } from '../repositories';

const container = new Container();

container.load(
  appModule,
  serviceModule,
  controllerModule,
  repositoryModule,
);

export { container };
