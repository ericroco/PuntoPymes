import { Test, TestingModule } from '@nestjs/testing';
import { NominaController } from './nomina.controller';
import { NominaService } from './nomina.service';

describe('NominaController', () => {
  let nominaController: NominaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NominaController],
      providers: [NominaService],
    }).compile();

    nominaController = app.get<NominaController>(NominaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nominaController.getHello()).toBe('Hello World!');
    });
  });
});
