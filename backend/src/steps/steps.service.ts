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
  })
    return step  ;
  }

  findAll() {
    return `This action returns all steps`;
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


  update(id: number, updateStepDto: UpdateStepDto) {
    return `This action updates a #${id} step`;
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
