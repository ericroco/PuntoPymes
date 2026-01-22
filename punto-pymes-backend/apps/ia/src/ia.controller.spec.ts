import { Test, TestingModule } from '@nestjs/testing';
import { IaController } from './ia.controller';
import { IaService } from './ia.service';

describe('IaController', () => {
  let iaController: IaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IaController],
      providers: [IaService],
    }).compile();

    iaController = app.get<IaController>(IaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(iaController.getHello()).toBe('Hello World!');
    });
  });
});
