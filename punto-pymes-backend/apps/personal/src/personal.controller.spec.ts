import { Test, TestingModule } from '@nestjs/testing';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';

describe('PersonalController', () => {
  let personalController: PersonalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonalController],
      providers: [PersonalService],
    }).compile();

    personalController = app.get<PersonalController>(PersonalController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(personalController.getHello()).toBe('Hello World!');
    });
  });
});
