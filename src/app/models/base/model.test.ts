import { Model } from 'objection';
import { BaseModel } from './model';

describe('Base Model Unit Test', () => {
  it('should be defined', () => {
    expect(BaseModel).toBeDefined();
  });

  it('should be an instance of a Model', () => {
    expect(BaseModel.prototype).toBeInstanceOf(Model);
  });

    it('should have a idColumn', () => {
      expect(BaseModel.idColumn).toBe('id');
    });

    it('should have a model path', () => {
      expect(BaseModel.modelPaths).toBeDefined();
    });
});
