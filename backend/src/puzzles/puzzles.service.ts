import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puzzle } from './entities/puzzle.entity';
import { Step } from 'src/steps/entities/step.entity';

@Injectable()
export class PuzzlesService {
  constructor(
    @InjectRepository(Puzzle)
    private readonly puzzleRepository: Repository<Puzzle>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(puzzleData: Omit<Puzzle, 'id'>) {
    console.log('Received Puzzle Data:', puzzleData); // Debugging log

    const { steps, ...puzzleDetails } = puzzleData;

    if (!puzzleDetails.title) {
        throw new Error("Puzzle title is required and cannot be null");
    }

    const puzzle = this.puzzleRepository.create(puzzleDetails);
    console.log('Created Puzzle Entity:', puzzle); // Log entity before saving

    await this.puzzleRepository.save(puzzle);
    console.log('Saved Puzzle:', puzzle); // Log saved entity

    for (const step of steps || []) { // Ensure steps exist
        const existingStep = await this.stepRepository.findOne({
            where: { description: step.description, puzzle: { id: puzzle.id } },
        });

        if (!existingStep) {
            const newStep = this.stepRepository.create({ ...step, puzzle });
            await this.stepRepository.save(newStep);
        }
    }

    return puzzle;
}

  async findAll(): Promise<Puzzle[]> {
    return this.puzzleRepository.find({ relations: ['steps'] });
  }

  async findOne(id: number): Promise<Puzzle> {
    return this.puzzleRepository.findOne({
      where: { id },
      relations: ['steps'],
    });
  }

  async validateStepOrder(puzzleId: number, userSteps: Step[]): Promise<boolean> {
    if (!Array.isArray(userSteps)) {
        throw new Error("userSteps must be an array");
    }
    const puzzle = await this.findOne(puzzleId);
    const correctOrder = puzzle.steps.map(step => step.order);
    const userOrder = userSteps.map(step => step.order);
    return JSON.stringify(correctOrder) === JSON.stringify(userOrder);
}


  async calculateScore(puzzleId: number, userSteps: Step[]): Promise<number> {
    const puzzle = await this.findOne(puzzleId);
    const correctSteps = userSteps.filter(step => step.isCorrect).length;
    return correctSteps * puzzle.points;
  }

  async getHint(puzzleId: number, stepId: number): Promise<string | null> {
    const step = await this.stepRepository.findOne({
      where: { id: stepId, puzzle: { id: puzzleId } },
    });
    return step ? step.hints[0] : null;
  } 
}
