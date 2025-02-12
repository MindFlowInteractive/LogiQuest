import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressResponseDto, UpdateProgressDto } from './dto/progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProgressResponseDto> {
    return this.progressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ): Promise<ProgressResponseDto> {
    return this.progressService.update(+id, updateProgressDto);
  }
}
