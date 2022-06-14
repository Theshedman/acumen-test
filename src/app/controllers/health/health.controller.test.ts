import 'reflect-metadata';
import { interfaces } from 'inversify-express-utils';
import { container } from '../../configs/inversity.config';
import { ModuleToken } from '../../configs/module.token';
import { mockedHttpContext } from '../__fixtures__';
import { HealthController } from './health.controller';
import DoneCallback = jest.DoneCallback;

describe('Health Controller Unit Test', () => {
  let healthController: HealthController;

  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();

    container.bind<interfaces.HttpContext>(ModuleToken.HttpContext).toConstantValue(mockedHttpContext);

    healthController = container.get<HealthController>(ModuleToken.HealthController);
  });

  afterEach(() => {
    // restore the original snapshot
    container.restore();

    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  afterAll((done: DoneCallback) => {
    done();
  });

    it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

    it('should return health status', async () => {
    const result = await healthController.getServiceHealth();

    expect(result.statusCode).toBe(200);
    expect(result.json.message).toBe('Service is running');
  });
});
