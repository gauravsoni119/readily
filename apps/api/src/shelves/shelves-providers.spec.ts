import { Test, TestingModule } from '@nestjs/testing';
import { ShelvesProviders } from './shelves-providers';

describe('ShelvesProviders', () => {
  let provider: ShelvesProviders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShelvesProviders],
    }).compile();

    provider = module.get<ShelvesProviders>(ShelvesProviders);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
