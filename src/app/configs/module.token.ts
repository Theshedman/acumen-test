export const ModuleToken = {
  // controllers
  BaseController: Symbol.for('BaseController'),
  CityController: Symbol.for('CityController'),
  HealthController: Symbol.for('HealthController'),
  WebhookController: Symbol.for('WebhookController'),
  ForecastController: Symbol.for('ForecastController'),
  TemperatureController: Symbol.for('TemperatureController'),

  // services
  BaseService: Symbol.for('BaseService'),
  CityService: Symbol.for('CityService'),
  RedisService: Symbol.for('RedisService'),
  WebhookService: Symbol.for('WebhookService'),
  ForecastService: Symbol.for('ForecastService'),
  TemperatureService: Symbol.for('TemperatureService'),

  // repositories
  Utils: Symbol.for('Utils'),
  BaseRepository: Symbol.for('BaseRepository'),
  CityRepository: Symbol.for('CityRepository'),
  WebhookRepository: Symbol.for('WebhookRepository'),
  TemperatureRepository: Symbol.for('TemperatureRepository'),

  // server
  App: Symbol.for('App'),

  // HttpContext
  HttpContext: Symbol.for('HttpContext'),

  // models
  ModelClass: Symbol('ModelClass'),

  // Events
  WebhookEvent: Symbol.for('WebhookEvent'),
};
