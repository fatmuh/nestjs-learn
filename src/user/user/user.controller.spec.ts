import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', () => {
    const response = controller.sayHello('Fathur');
    expect(response).toBe('Hello Fathur');
  });

  it('can view template', () => {
    const response = httpMock.createResponse();
    controller.viewHello('Fathur', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Fathur',
      title: 'Template Engine',
    });
  });
});
