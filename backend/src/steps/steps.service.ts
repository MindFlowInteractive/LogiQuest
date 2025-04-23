import { Injectable, NotFoundException } from '@nestjs/common';
import { correctAnswerDTO, CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private stepRepo: Repository<Step>,
  ){}
  
async create(dto: CreateStepDto) {
  const step = await this.stepRepo.create({
    description: dto.description,
    order: dto.order,
    hints: dto.hints,
    correctAnswer: dto.correctAnswer,
    options: dto.options
  });
  return await this.stepRepo.save(step); 
}

  async findAll() {
    return await this.stepRepo.find();
  }

  async findOne(id: number) {
    const step = await this.stepRepo.findOne({where:{id}})
    return step;
  }

  async correctAnswer(dto: correctAnswerDTO) {
    try {
      const step = await this.stepRepo.findOne({ where: { id: dto.stepId } })
      if (!step) {
        throw new NotFoundException('Step Not Found')
      }
      if (step.correctAnswer !== dto.answer) {
        return {
          message: 'Not the correct answer'
        }
      }
      if (step && step.correctAnswer === dto.answer) {
        return {
          message: 'This is the correct answer'
        }
      }
    } catch (error) {
      throw error
    }
  }


async update(id: number, updateStepDto: UpdateStepDto) {
  const step = await this.stepRepo.findOne({ where: { id } });
  if (!step) {
    throw new NotFoundException(`Step with ID ${id} not found`);
  }
  
  Object.assign(step, updateStepDto);
  return await this.stepRepo.save(step);
}

async remove(id: number) {
  const step = await this.stepRepo.findOne({ where: { id } });
  if (!step) {
    throw new NotFoundException(`Step with ID ${id} not found`);
  }
  
  return await this.stepRepo.remove(step);
}
}
