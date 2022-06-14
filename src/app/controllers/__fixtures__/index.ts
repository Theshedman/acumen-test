import { interfaces } from 'inversify-express-utils';
import { mockReq, mockRes } from 'sinon-express-mock';
import { container } from '../../configs/inversity.config';


export const mockedHttpContext: interfaces.HttpContext = {
  request: mockReq(),
  response: mockRes(),
  user: {
    details: '',
    isAuthenticated: () => Promise.resolve(true),
    isResourceOwner: () => Promise.resolve(true),
    isInRole: () => Promise.resolve(true),
  },
  container,
};
