import { Injectable } from '@nestjs/common';
import { ProgressResponseDto, UpdateProgressDto } from './dto/progress.dto';

@Injectable()
export class ProgressService {
  findOne(id: number): Promise<ProgressResponseDto> {
    return Promise.resolve({
      chainId: id,
      progress: 0,
      score: 0,
      completed: false,
      lastAttempt: new Date(),
    });
  }

  update(
    id: number,
    updateProgressDto: UpdateProgressDto,
  ): Promise<ProgressResponseDto> {
    return Promise.resolve({
      chainId: id,
      progress: updateProgressDto.currentStep,
      score: updateProgressDto.score,
      completed: updateProgressDto.completed,
      lastAttempt: new Date(),
    });
  }
}
