/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto, ProgressResponseDto, UpdateProgressDto } from './dto/progress.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('progress')
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get progress by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Progress entry ID' })
  findOne(@Param('id') id: number) {
    return this.progressService.findOne(id);
  }

  @Get('user/:userId')
  getUserProgress(@Param('userId') userId: number) {
    return this.progressService.getUserProgress(userId);
  }

  @Post('chains/:chainId')
  updateChainProgress(
    @Body('userId') userId: number,
    @Param('chainId') chainId: number,
    @Body('status') status: string,
  ) {
    return this.progressService.updateChainProgress(userId, chainId, status);
  }

  @Post()
@ApiOperation({ summary: 'Create a new progress entry' })
@ApiResponse({ status: 201, description: 'Progress entry successfully created' })
createProgress(@Body() createProgressDto: CreateProgressDto) {
  return this.progressService.create(createProgressDto);
}

  @Patch(':id')
  @ApiOperation({ summary: 'Update progress by ID' })
  update(
    @Param('id') chainId: number,
    status: number,
    userId: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.progressService.updateChainProgress(chainId, status, userId);
  }

 
}