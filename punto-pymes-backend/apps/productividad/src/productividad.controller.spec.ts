import { Test, TestingModule } from '@nestjs/testing';
import { ProductividadController } from './productividad.controller';
import { ProductividadService } from './productividad.service';

describe('ProductividadController', () => {
  let productividadController: ProductividadController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductividadController],
      providers: [ProductividadService],
    }).compile();

    productividadController = app.get<ProductividadController>(ProductividadController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productividadController.getHello()).toBe('Hello World!');
    });
  });
});
