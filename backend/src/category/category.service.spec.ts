import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Puzzle } from '../puzzles/entities/puzzle.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let puzzleRepository: Repository<Puzzle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Puzzle),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              distinct: jest.fn().mockReturnThis(),
              getRawMany: jest.fn(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getMany: jest.fn(),
              groupBy: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    puzzleRepository = module.get<Repository<Puzzle>>(
      getRepositoryToken(Puzzle),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(puzzleRepository).toBeDefined();
  });

});
